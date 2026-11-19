#!/usr/bin/env node
/**
 * run-all.mjs — Orchestrate all quality checks.
 *
 * This script runs every quality check in order and produces a consolidated
 * report. It is designed to be called from a verification sub-agent with
 * `dangerouslyDisableSandbox: true` (ng build and ng test require it).
 *
 * Usage:
 *   node run-all.mjs [--skip-lint] [--skip-tsc] [--skip-build] [--skip-test]
 *
 * Exit codes:
 *   0 — All checks passed
 *   1 — One or more checks failed
 *
 * The script is called from a SKILL.md which defines the workflow.
 * The sub-agent only needs to call this script and report the result.
 * No other calls are needed.
 */

import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '../../../..');

const args = process.argv.slice(2);
const skipLint = args.includes('--skip-lint');
const skipTsc = args.includes('--skip-tsc');
const skipBuild = args.includes('--skip-build');
const skipTest = args.includes('--skip-test');

const results = [];
let overallExit = 0;

// ─── Helper ───────────────────────────────────────────────
function runCheck(name, command, sandboxed = false) {
  if (sandboxed) {
    console.log(`  [sandboxed]  ${name}`);
  } else {
    console.log(`  [outside]    ${name}`);
  }

  try {
    execSync(command, {
      cwd: rootDir,
      stdio: 'inherit',
    });
    results.push({ name, status: 'pass' });
    return true;
  } catch (error) {
    results.push({ name, status: 'fail', exitCode: error.status });
    return false;
  }
}

// ─── Report ───────────────────────────────────────────────
function printReport() {
  console.log('\n' + '='.repeat(56));
  console.log('QUALITY GATE REPORT');
  console.log('='.repeat(56));

  for (const { name, status, exitCode } of results) {
    const icon = status === 'pass' ? '✅' : '❌';
    const label = status === 'pass' ? 'PASS' : 'FAIL';
    const detail = exitCode ? ` (exit ${exitCode})` : '';
    console.log(`  ${icon} ${name}: ${label}${detail}`);
  }

  console.log('='.repeat(56));
  if (overallExit === 0) {
    console.log('RESULT: All checks passed');
  } else {
    console.log(`RESULT: ${results.filter(r => r.status === 'fail').length} check(s) failed`);
  }
  console.log('='.repeat(56));
}

// ─── Main ─────────────────────────────────────────────────
console.log('\n' + '='.repeat(56));
console.log('QUALITY GATE — Running all checks');
console.log('='.repeat(56));

// Step 1: ESLint (sandboxed)
if (!skipLint) {
  console.log('\n▸ Step 1/4: ESLint');
  console.log('-'.repeat(40));
  if (!runCheck('ESLint', 'npx eslint . --max-warnings 0', true)) {
    overallExit = 1;
  }
} else {
  console.log('\n▸ Step 1/4: ESLint — SKIPPED');
}

// Step 2: TypeScript (sandboxed)
if (!skipTsc) {
  console.log('\n▸ Step 2/4: TypeScript');
  console.log('-'.repeat(40));
  if (!runCheck('TypeScript', 'npx tsc --noEmit', true)) {
    overallExit = 1;
  }
} else {
  console.log('\n▸ Step 2/4: TypeScript — SKIPPED');
}

// Step 3: Angular Build (outside sandbox)
if (!skipBuild) {
  console.log('\n▸ Step 3/4: Angular Build');
  console.log('-'.repeat(40));
  if (!runCheck('Angular Build', 'npx ng build --configuration development', false)) {
    overallExit = 1;
  }
} else {
  console.log('\n▸ Step 3/4: Angular Build — SKIPPED');
}

// Step 4: Angular Tests (outside sandbox)
if (!skipTest) {
  console.log('\n▸ Step 4/4: Angular Tests');
  console.log('-'.repeat(40));
  if (!runCheck('Angular Tests', 'npx ng test --watch=false', false)) {
    overallExit = 1;
  }
} else {
  console.log('\n▸ Step 4/4: Angular Tests — SKIPPED');
}

printReport();
process.exit(overallExit);
