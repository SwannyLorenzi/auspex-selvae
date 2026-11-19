#!/usr/bin/env node
/**
 * verify-lint.mjs — Run ESLint check.
 *
 * This script runs `npx eslint . --max-warnings 0` and reports the result.
 * It is designed to run INSIDE the sandbox (eslint does not use FSEvents).
 *
 * Usage:
 *   node verify-lint.mjs
 *
 * Exit codes:
 *   0 — ESLint passed with no errors or warnings
 *   1 — ESLint found errors or warnings
 */

import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '../../../..');

console.log('Running: npx eslint . --max-warnings 0');
console.log('-'.repeat(40));

try {
  execSync('npx eslint . --max-warnings 0', {
    cwd: rootDir,
    stdio: 'inherit',
  });
  console.log('\n✓ ESLint: no errors or warnings');
  process.exit(0);
} catch (error) {
  console.error('\n✗ ESLint: FAILED');
  console.error(`  Exit code: ${error.status}`);
  process.exit(1);
}
