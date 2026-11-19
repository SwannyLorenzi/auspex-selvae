#!/usr/bin/env node
/**
 * verify-tsc.mjs — Run TypeScript type check only.
 *
 * This script runs `tsc --noEmit` and reports the result.
 * It is designed to run INSIDE the sandbox (tsc does not use FSEvents).
 *
 * For the Angular build, use `ng-build.mjs` instead (runs outside sandbox).
 *
 * Usage:
 *   node verify-tsc.mjs
 *
 * Exit codes:
 *   0 — TypeScript compilation successful
 *   1 — TypeScript compilation failed
 */

import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '../../../..');

console.log('Running: npx tsc --noEmit');
console.log('-'.repeat(40));

try {
  execSync('npx tsc --noEmit', {
    cwd: rootDir,
    stdio: 'inherit',
  });
  console.log('\n✓ TypeScript compilation: successful');
  process.exit(0);
} catch (error) {
  console.error('\n✗ TypeScript compilation: FAILED');
  console.error(`  Exit code: ${error.status}`);
  process.exit(1);
}
