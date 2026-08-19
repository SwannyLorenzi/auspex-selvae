#!/usr/bin/env node
/**
 * check-red.mjs — is this failing suite handoff-ready?
 *
 * Spec-first means your work ends on red, but only one kind of red is useful to the
 * agent that implements the feature. This reads a Vitest JSON report and enforces:
 *
 *   1. no suite failed to load          (a load error gives the implementer a wall, not a gauge)
 *   2. every assertion step fails       (a criterion nobody checks is a criterion nobody implements)
 *   3. every failure is an AssertionError (a TypeError means a broken stub, not missing behaviour)
 *   4. no assertion step passes         (it is tautological, or the behaviour already exists)
 *
 * Usage:
 *   npx ng test --watch=false --include "<glob>" --reporters json --output-file /tmp/tg-report.json
 *   node check-red.mjs /tmp/tg-report.json
 *
 * Exit code 0 = ready to hand off. 1 = fix what it prints first.
 */
import { readFileSync } from 'node:fs';

const SETUP = new Set(['Given', 'When', 'Soit', 'Sachant', 'Etant', 'Étant', 'Quand', 'Lorsque']);
const ASSERT = new Set(['Then', 'Alors', 'Donc']);
const INHERIT = new Set(['And', 'But', 'Et', 'Mais']);
const KEYWORDS = [...SETUP, ...ASSERT, ...INHERIT];

/** Gherkin keywords sit in the middle of a Vitest fullName; the step's own keyword is the last one. */
function stepKeyword(fullName) {
  let found = null;
  for (const kw of KEYWORDS) {
    const re = new RegExp(`\\b${kw}\\b`, 'g');
    let m;
    while ((m = re.exec(fullName)) !== null) {
      if (found === null || m.index > found.index) found = { index: m.index, kw };
    }
  }
  return found?.kw ?? null;
}

const reportPath = process.argv[2];
if (!reportPath) {
  console.error('usage: node check-red.mjs <vitest-json-report>');
  process.exit(2);
}

let report;
try {
  report = JSON.parse(readFileSync(reportPath, 'utf8'));
} catch (error) {
  console.error(`Cannot read ${reportPath}: ${error.message}`);
  console.error('If the build itself failed, no report is written — fix the build first.');
  process.exit(2);
}

const loadFailures = [];
const missingRed = [];
const wrongError = [];
const suspiciousGreen = [];
let assertionSteps = 0;

for (const file of report.testResults ?? []) {
  const name = file.name ?? '?';
  const steps = file.assertionResults ?? [];

  // A suite that never produced a test did not run: contract violation or load error.
  if (steps.length === 0) {
    loadFailures.push({ name, message: (file.message || 'suite produced no tests').trim() });
    continue;
  }

  let phase = 'setup';
  for (const step of steps) {
    const kw = stepKeyword(step.fullName ?? step.title ?? '');
    if (kw && ASSERT.has(kw)) phase = 'assert';
    else if (kw && SETUP.has(kw)) phase = 'setup';
    // INHERIT (And/But) keeps the current phase, which is why order matters here.

    if (phase !== 'assert') continue;
    assertionSteps++;

    const label = `${name.split('/').pop()} › ${step.fullName}`;
    if (step.status === 'passed') {
      suspiciousGreen.push(label);
    } else if (step.status === 'failed') {
      const msg = (step.failureMessages ?? []).join('\n');
      if (!/AssertionError|expected .* to /i.test(msg)) {
        wrongError.push({ label, first: msg.split('\n')[0]?.slice(0, 140) ?? '' });
      }
    } else {
      missingRed.push(`${label} (status: ${step.status})`);
    }
  }
}

const problems = [];
const say = (lines) => lines.forEach((l) => console.log(l));

if (loadFailures.length) {
  problems.push('load');
  say(['', `✗ ${loadFailures.length} suite(s) never ran — the implementer would get a wall, not a gauge:`]);
  for (const f of loadFailures) say([`    ${f.name}`, `      ${f.message.split('\n').join('\n      ')}`]);
  say([
    '  Fix: "was not called" / "Missing steps" means the spec does not cover the .feature —',
    '  implement the missing Scenario or step. Any other message is a compile or import error;',
    '  create the stubs so the types exist. Never edit the .feature to make this go away.',
  ]);
}

if (wrongError.length) {
  problems.push('error-type');
  say(['', `✗ ${wrongError.length} assertion step(s) fail on a runtime error, not an assertion:`]);
  for (const w of wrongError) say([`    ${w.label}`, `      ${w.first}`]);
  say(['  Fix: the stub is incomplete or the fixture is wrong. Missing behaviour must surface as a', '  failed expectation, not a crash — otherwise the message does not say what to build.']);
}

if (suspiciousGreen.length) {
  problems.push('green');
  say(['', `✗ ${suspiciousGreen.length} assertion step(s) already pass before implementation:`]);
  for (const g of suspiciousGreen) say([`    ${g}`]);
  say([
    '  Either the assertion proves nothing (tautology — assert the real value, not truthiness),',
    '  or the behaviour already exists. The second case is worth reporting to the user: the',
    '  criterion may already be satisfied.',
  ]);
}

if (missingRed.length) {
  problems.push('skipped');
  say(['', `✗ ${missingRed.length} assertion step(s) neither passed nor failed:`]);
  for (const s of missingRed) say([`    ${s}`]);
  say(['  Fix: remove the skip. A skipped criterion is an uncovered criterion.']);
}

if (assertionSteps === 0 && !loadFailures.length) {
  problems.push('no-assertions');
  say(['', '✗ No assertion step found. Every scenario needs at least one Then — a scenario that', '  checks nothing lets the implementer declare victory without doing the work.']);
}

if (problems.length === 0) {
  console.log('');
  console.log(`✓ Handoff-ready: ${assertionSteps} assertion step(s), all failing on assertions, 0 load errors.`);
  console.log('  The implementer has a gauge that goes to zero. Hand off.');
  process.exit(0);
}

console.log('');
console.log(`Not handoff-ready (${problems.join(', ')}).`);
process.exit(1);
