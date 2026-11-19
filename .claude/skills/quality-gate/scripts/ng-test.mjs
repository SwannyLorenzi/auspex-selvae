#!/usr/bin/env node
/**
 * ng-test.mjs — Run Angular unit tests.
 *
 * This script runs `npx ng test --watch=false` and reports the result.
 * It MUST be called with `dangerouslyDisableSandbox: true` because
 * Angular tests may use file watchers (chokidar + FSEvents).
 *
 * Usage:
 *   node ng-test.mjs
 *
 * Exit codes:
 *   0 — All tests passed
 *   1 — Tests failed
 */

import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '../../../..');

console.log('Running: npx ng test --watch=false');
console.log('-'.repeat(50));

try {
  execSync('npx ng test --watch=false', {
    cwd: rootDir,
    stdio: 'inherit',
  });
  console.log('\n✓ Angular tests: all passing');
  process.exit(0);
} catch (error) {
  console.error('\n✗ Angular tests: FAILED');
  console.error(`  Exit code: ${error.status}`);
  if (error.status === 134 || error.signal === 'SIGABRT') {
    console.error();
    console.error('  ⚠ This is a sandbox limitation (FSEvents blocked).');
    console.error('  This script must be called with:');
    console.error('    dangerouslyDisableSandbox: true');
  }
  process.exit(1);
}
