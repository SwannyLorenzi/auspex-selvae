---
name: quality-gate
description: Post-implementation quality verification. Runs linting, TypeScript compilation, Angular build, and tests before marking work as complete. Use after finishing a feature or significant code change to ensure all quality checks pass.
---

# Quality Gate

## Purpose

Verify code quality after implementing a feature. This skill runs all quality checks — linting, TypeScript compilation, Angular build, and tests — and reports the results.

## Workflow

### Run the quality gate

```bash
node .claude/skills/quality-gate/scripts/run-all.mjs
```

This single command runs all checks in order and produces a consolidated report.

**For a verification sub-agent**: Call this script with `dangerouslyDisableSandbox: true`. The script handles sandbox constraints internally (some checks are sandboxed, others are not).

### Interpret the result

The script returns:
- **Exit 0** — All checks passed. The implementation is ready.
- **Exit 1** — One or more checks failed. Fix the issues and re-run.

### Report to the implementer

If all checks pass, report:
```
✅ Quality gate passed: ESLint, TypeScript, Angular Build, Tests
```

If any check fails, report the specific failures and fix them before proceeding.

## When to run

Run this verification after completing any feature implementation or significant code change. Do NOT run it after every individual file write — only after the full feature is implemented.

## Details

- See `MEMO.md` for sandbox constraints and script documentation
- See `scripts/` for individual check scripts (can be run independently)
