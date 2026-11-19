#!/usr/bin/env node
/**
 * ng-build.mjs — Run Angular build.
 *
 * This script runs `ng build --configuration development`.
 * It MUST be called with `dangerouslyDisableSandbox: true` because
 * Angular uses chokidar with FSEvents which conflicts with macOS Seatbelt.
 *
 * Usage:
 *   node ng-build.mjs
 *
 * Exit codes:
 *   0 — Angular build successful
 *   1 — Angular build failed
 */

import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = join(__dirname, '../../../..');

console.log('Running: npx ng build --configuration development');
console.log('-'.repeat(50));

try {
  execSync('npx ng build --configuration development', {
    cwd: rootDir,
    stdio: 'inherit',
  });
  console.log('\n✓ Angular build: successful');
  process.exit(0);
} catch (error) {
  console.error('\n✗ Angular build: FAILED');
  console.error(`  Exit code: ${error.status}`);
  if (error.status === 134 || error.signal === 'SIGABRT') {
    console.error();
    console.error('  ⚠ This is a sandbox limitation (FSEvents blocked).');
    console.error('  This script must be called with:');
    console.error('    dangerouslyDisableSandbox: true');
  }
  process.exit(1);
}
