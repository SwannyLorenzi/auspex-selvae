# Memo: Quality Gate

## Sandbox constraints

Several quality checks run fine inside the sandbox, but some require
`dangerouslyDisableSandbox: true` due to macOS Seatbelt restrictions.

### Sandboxable (no special flag needed)

- `npx eslint .` — linting works in sandbox
- `npx tsc --noEmit` — TypeScript type checking works in sandbox

### Requires `dangerouslyDisableSandbox: true`

- `npx ng build --configuration development` — Angular build uses chokidar
  with FSEvents which conflicts with macOS Seatbelt sandbox (exit code 134)
- `npx ng test --watch=false` — Angular tests may use file watchers

## How to run

### From the implementer (in sandbox)

The implementer calls the quality-gate skill, which orchestrates the
verification. The skill handles sandbox constraints internally.

### From a sub-agent (verification agent)

A verification sub-agent can run the same checks. For sandboxed checks,
run normally. For checks requiring `dangerouslyDisableSandbox: true`,
apply the flag to those specific tool calls.

### Example workflow

```
Step 1 (sandboxed):
  node .claude/skills/quality-gate/scripts/verify-lint.mjs
  node .claude/skills/quality-gate/scripts/verify-tsc.mjs

Step 2 (outside sandbox):
  node .claude/skills/quality-gate/scripts/ng-build.mjs
  with dangerouslyDisableSandbox: true

Step 3 (outside sandbox):
  node .claude/skills/quality-gate/scripts/ng-test.mjs
  with dangerouslyDisableSandbox: true
```

## Why

- `eslint` and `tsc --noEmit` do NOT use FSEvents → work fine in sandbox
- `ng build` and `ng test` use `chokidar` + FSEvents → fail in sandbox
- The `dangerouslyDisableSandbox` flag is per-tool-call, not inherited
- Apply it ONLY to the ng steps, keep eslint and tsc sandboxed
