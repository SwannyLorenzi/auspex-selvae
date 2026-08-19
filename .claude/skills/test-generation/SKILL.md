---
name: test-generation
description: Generate automated tests for this project from Gherkin acceptance criteria, spec-first — tests are written BEFORE the implementation and act as guardrails for whoever implements the feature. Use this skill whenever tests are involved in any way: writing or editing a .spec.ts, adding a test case, writing step definitions, wiring a .feature file, building a test fixture, or when asked to "test", "cover", "add coverage for", or "check" any behaviour in this repo. Use it even when the request sounds trivial ("just add a quick test for this") and even when no .feature file is mentioned. Do NOT use it to run an existing suite, to debug a test whose production code is at fault, or to write production code that makes tests pass.
---

# Test generation — spec-first, tests as guardrails

## What you are actually producing

In this project tests come **before** the implementation. You turn acceptance criteria — Gherkin
`.feature` files, owned by the user — into executable tests that **fail**, and hand them to whoever
implements the feature. Those failing tests are the implementer's specification and their progress
gauge: they are done when everything is green, and they are forbidden from touching the tests to get
there.

So a green suite at the end of your work is not success, it is a symptom. Your job ends on **red** —
but a specific kind of red.

## Red for the right reason

| | What the implementer sees | Verdict |
|---|---|---|
| The file compiles, 7 steps run, the 3 `Then` steps fail on assertions | A list of what is missing, and a gauge: 3 → 2 → 0 | **This is your goal** |
| `MagicComponent` does not exist, the spec never loads, 0 tests run | A binary wall. No gauge, no idea what is missing | **Failure** |
| A `Then` step passes before anything is implemented | False confidence — the assertion proves nothing, or the behaviour already existed | **Failure** |

A suite that fails to load teaches nobody anything, and you cannot distinguish missing behaviour from
a broken import. So before you hand off, the suite must **compile and fail only on assertions**.

This is why you create compilable stubs even though you are the *test* agent: in a typed language the
red phase requires the types to exist first. Creating them is not scope creep, it is what makes the
red readable.

## The contract boundary — never cross it

`.feature` files and the criteria inside them belong to the user. You never edit, rephrase, reorder,
or delete a scenario. Not to fix an obvious typo. Not when a scenario is impossible to test as
written. Not when you are one word away from making everything work.

The reason is structural rather than procedural: **a guardrail only guards if the agent it constrains
cannot edit it.** The moment "adjust the criterion" is an available escape, a stuck agent takes it —
and the same rule binds the implementer downstream, who may not touch your tests. Keep this boundary
intact and the whole chain holds; breach it once and none of the three layers means anything.

When you hit a wall — a scenario you cannot express, a step phrase absent from the vocabulary, a
criterion with two readings — **stop and report**: what blocks you, why, and a concrete proposed
wording. The user decides. Once they approve, the `.feature` changes on their side and you resume.

## Workflow

### 1. Read the criteria and the vocabulary

Read the `.feature` file(s) in scope, then `specs/vocabulary.md` (regenerate it first if it looks
stale: `node .claude/skills/test-generation/scripts/build-vocabulary.mjs`). The vocabulary tells you
which step phrases already have implementations, so you reuse instead of inventing a near-duplicate.

If a step phrase in the `.feature` is not in the vocabulary and not implementable from existing
helpers, that is a new entry — fine, you own the vocabulary. If it is a *near-duplicate* of an
existing phrase, stop and report it: two phrasings for one meaning is the failure mode this project
is set up to prevent.

### 2. Traceability, validated before you write any code

Produce a short table mapping every `Scenario` to the tests it will produce, and show it to the user
before writing code. Check it in both directions:

- a scenario with no test means the implementer can declare victory without doing the work;
- a test with no scenario means you are specifying behaviour nobody asked for, and the implementer
  will build it.

This is the cheapest moment to catch a misunderstanding. After this, code.

### 3. Define the contract — the minimal public surface

Name the files, the component selector, the typed `input()`/`output()`, and the model types the tests
will touch. Nothing else.

Discipline: **fix only what the test touches.** If a test does not need to know there is a `computed()`
inside, the contract does not mention it. Over-specifying here dictates the implementation, which
defeats the point of handing it to someone else.

### 4. Create compilable stubs

`ng generate component <name>` for new components, then declare the surface from step 3: inputs,
outputs, model types, empty template, **no logic**. The stub must be visibly empty — a half-written
implementation makes the red ambiguous.

Delete the CLI-generated `.spec.ts` skeleton; your Gherkin spec replaces it.

### 5. Write the steps

See "Writing steps" below. This is where the quality of the whole handoff is decided.

### 6. Verify the red

```bash
npx ng test --watch=false --include "<glob>" --reporters json --output-file /tmp/tg-report.json
node .claude/skills/test-generation/scripts/check-red.mjs /tmp/tg-report.json
```

`check-red.mjs` enforces the four conditions that make a red handoff-ready, and prints what to fix.
Do not hand off until it passes. Read `references/verifying-red.md` if a verdict needs interpreting.

### 7. Regenerate the vocabulary

```bash
node .claude/skills/test-generation/scripts/build-vocabulary.mjs
```

This rewrites `specs/vocabulary.md` from the code, so it cannot go stale. The prose→Gherkin skill
reads it to phrase new criteria in existing vocabulary.

### 8. Hand off

Close with a short block for the implementer (template at the end of this file). The rule that
carries the rest: **they do not modify the tests or the `.feature`.** If they believe a test is wrong,
they stop and ask the user.

## Language rules

Code, file names, folders, component names, and **Gherkin (keywords and step phrasing) are English**.

But the application displays French and has no i18n layer, so the *values* your assertions compare
against are French strings. Do not translate expected UI text into English — the test would be
permanently red for the wrong reason.

Where each French string belongs:

- **Domain data goes in the `.feature`**, because the criterion is about that data:
  `Given the character knows the spell "Identification de substance"`
- **UI chrome stays out of the `.feature`** and lives in the step implementation: labels, button text,
  accessible names. Write `Then the reset control is available`, and let the step know the accessible
  name is `"Réinitialiser toutes les utilisations de sorts"`.

The reason for the split: if the label becomes "Remettre à zéro", an acceptance criterion should not
have to change. Keep the `.feature` at the altitude of the need, not the wording of the view.

## Gherkin → Vitest mechanics

Verified on Angular 21.2 + Vitest 4.1 with `@amiceli/vitest-cucumber` 7. Full details and gotchas in
`references/gherkin-vitest.md` — read it before your first spec in a session.

```ts
import { describeFeature, loadFeature } from '@amiceli/vitest-cucumber';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MagicComponent } from './magic';

const feature = await loadFeature('./magic.feature');

describeFeature(feature, ({ Background, Scenario }) => {
  let fixture: ComponentFixture<MagicComponent>;
  const host = () => fixture.nativeElement as HTMLElement;

  Scenario('The character spells are listed', ({ Given, When, Then }) => {
    Given('the character knows the spell "Identification de substance"', () => { /* fixture */ });
    When('the magic section is displayed', async () => {
      fixture = TestBed.createComponent(MagicComponent);
      fixture.componentRef.setInput('magic', magic);
      await fixture.whenStable();
    });
    Then('the spell "Identification de substance" is listed', () => {
      expect(byRole(host(), 'listitem', 'Identification de substance')).not.toBeNull();
    });
  });
});
```

Four things that matter:

- **One Gherkin step = one Vitest test.** Test names are `Feature: … > Scenario: … > Given …`, so
  traceability is structural. Never restate the scenario in a comment; the tree already says it.
- **`loadFeature` resolves relative to the spec file** and needs top-level `await`. Both work under
  the Angular builder.
- **`Scenario Outline` placeholders do not compose with shared parameterised steps.** Inside an
  outline, declare the step with the literal placeholder (`'a character of power <power>'`); a shared
  `{number}` step will not match. Either plain scenarios with shared vocabulary, or outlines with
  local steps.
- **Stay inside portable Gherkin.** No custom world, no exotic hooks, no library-specific extension.
  The `.feature` files and step bodies must survive a runner swap with only the wrapper rewritten —
  that is what makes a single-maintainer dependency an acceptable risk here.

## Writing steps

**Build fixtures with factories; never import `characterData`.** Real app data couples every test to
the user's character sheet: change a spell, break unrelated tests. Write a local
`makeSpell({ level: 2 })` that fills defaults, and let the test state only the values it cares about —
which also documents what the case is actually about.

Make the factory vary whatever the template tracks. `@for (spell of spells; track spell.name)` with two
fixtures called "Sort de test" raises `NG0955` and renders unpredictably — a confusing failure that has
nothing to do with the criterion. Give the identity field a distinct default per call (a counter is
enough).

**Query by role and accessible name, not CSS classes.** Use the `byRole` helper in
`src/testing/dom.ts` (create it from `references/dom-helpers.md` if absent). Two payoffs: tests
survive a restyle, and they fail when accessibility breaks — which this project requires (AXE, WCAG
AA). Written before the template exists, such an assertion can only be satisfied by accessible
markup, so the test becomes the accessibility spec rather than a check that happens afterwards.
`data-testid` is a last resort, when no role and no visible text can identify the element.

**Assert the gap, precisely.** `expect(spells).toHaveLength(3)` gives the implementer
`expected 0 to be 3`. `expect(ok).toBe(true)` gives them `expected false to be true`, which says
nothing. Prefer counts, exact values, and specific elements over `textContent).toContain(...)` on the
whole component.

**Use `await fixture.whenStable()`**, not a pile of `detectChanges()` calls — the test should not
depend on how many change-detection cycles the implementation happens to need.

**Import real child components.** Do not mock what this project owns unless it is slow or has side
effects; a mocked child hides integration bugs that the criterion cares about.

**Keep types strict.** No `any` in tests, same as production code.

**Share a step at its second use.** Until a second feature needs it, a step lives locally in the spec.
Promote it to `src/testing/steps/*.steps.ts` (via `defineSteps`) when it is genuinely reused —
otherwise the shared registry fills with single-use phrases and stops being readable. Either way
`build-vocabulary.mjs` catalogues it, so location is a tidiness decision, not a vocabulary one.

## Handoff template

```markdown
## Ready to implement: <feature name>

Criteria: `<path>.feature` — <N> scenarios, <M> assertions.
Run: `npx ng test --watch=false --include "<glob>"`
Currently: <M> failing assertions, 0 loading errors.

Done when: every test is green, and code coverage on the files you touched is 100%
(95% tolerated for coverage artefacts).

Non-negotiable: do not modify the tests or the `.feature`. If a test looks wrong, or if you
find yourself writing code no test covers, stop and ask the user — uncovered code means either
the implementation went too far, or a criterion is missing. Both are the user's call, not yours.
```

## References

- `references/gherkin-vitest.md` — verified API, French/English keywords, known limits, packaging gotcha
- `references/verifying-red.md` — how to read `check-red.mjs` verdicts and fix each failure mode
- `references/dom-helpers.md` — the `byRole` helper source and why not `@testing-library/angular`
