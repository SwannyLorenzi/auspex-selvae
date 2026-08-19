# Verifying the red

```bash
npx ng test --watch=false --include "<glob>" --reporters json --output-file /tmp/tg-report.json
node .claude/skills/test-generation/scripts/check-red.mjs /tmp/tg-report.json
```

Exit 0 means the suite is handoff-ready. Exit 1 prints what to fix. Exit 2 means no readable report —
usually the build itself failed, so fix that first (the JSON is only written once the build succeeds).

## What it checks, and why each one matters

The script reads the Vitest JSON report, which distinguishes the two failure modes cleanly: a suite
that never ran has a `message` and an empty `assertionResults`, whereas a suite that ran and failed has
per-step results. That distinction is the whole basis of "red for the right reason".

**1. No suite failed to load.** A load error means zero tests executed. The implementer gets a binary
wall instead of a countdown, and you cannot tell missing behaviour from a missing import.

**2. Every assertion step fails.** A `Then` that nobody checks is a criterion nobody will implement.

**3. Every failure is an `AssertionError`.** A `TypeError` means your stub or fixture is broken, not
that the feature is missing — and its message does not tell the implementer what to build.

**4. No assertion step passes.** This is the primary failure mode of spec-first work, and it is free to
detect: before implementation, a passing `Then` is either tautological or describes behaviour that
already exists.

## Fixing each verdict

**`suite(s) never ran`** — read the message:

- `was not called` / `Missing steps` → the spec does not cover the `.feature`. Add the missing
  `Scenario` or step. Never touch the `.feature` to make the error disappear; if the scenario is
  genuinely untestable as written, stop and report to the user.
- anything else → a compile or import error. Create the stubs so the types exist (`ng generate
  component`, declare inputs/outputs and model types, empty template, no logic).

**`fail on a runtime error, not an assertion`** — the stub is missing a member the step touches, or the
fixture is incomplete. Add the declaration to the stub, or fix the factory. Resist the temptation to
wrap the call in a `try` — that hides the very thing the implementer needs to see.

**`already pass before implementation`** — two very different causes, and you must tell them apart:

- *Tautology*: `expect(x).toBeDefined()`, `expect(ok).toBeTruthy()`, `expect(list.length).toBeGreaterThanOrEqual(0)`.
  Replace with the value the criterion actually claims: a count, an exact string, a specific element.
- *Already implemented*: the behaviour exists. Report it to the user rather than deleting the test —
  a criterion that is already satisfied is useful information, and possibly a sign the `.feature`
  describes work already done.

**`neither passed nor failed`** — a skipped or todo step. A skipped criterion is an uncovered
criterion; remove the skip.

**`No assertion step found`** — every scenario needs at least one `Then`. Without one the scenario
executes and proves nothing, and the implementer can declare victory with an empty component.

## After the handoff

The same command is what the implementer runs, minus the JSON plumbing. Their gauge is the number of
failing assertion steps, and it should only go down. If it goes up, something regressed — which is the
suite doing its job.
