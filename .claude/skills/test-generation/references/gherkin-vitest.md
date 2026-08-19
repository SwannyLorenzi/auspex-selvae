# Gherkin → Vitest: verified mechanics

Everything here was verified by running it on this project (Angular 21.2.16, Vitest 4.1.8,
`@amiceli/vitest-cucumber` 7.0.0, jsdom, `@angular/build:unit-test` builder). Where something is a
limitation rather than a preference, the workaround is given.

## Why this library

It is the only option that stays on Angular's supported path: it is a plain library imported into a
normal `.spec.ts`, so it needs no `vitest.config.ts` and no `--runner-config`. Its whole coupling
surface is Vitest's public `describe`/`it` API — nothing in the build pipeline. That matters here
because the project tracks the latest version of everything, and `@angular/build:unit-test` is the
youngest, fastest-moving part of Angular 21.

The cost: a single maintainer, and a peer range pinned with a caret (`vitest ^4.0.4`), so a Vitest
major will need a release from them. Historically that took about three weeks. The mitigation is not
optimism, it is portability — see "Staying portable" below.

## Minimal shape

```ts
import { describeFeature, loadFeature } from '@amiceli/vitest-cucumber';

const feature = await loadFeature('./magic.feature');   // resolved relative to THIS file

describeFeature(feature, ({ Background, Scenario, ScenarioOutline }) => {
  Background(({ Given }) => { Given('…', () => {}); });
  Scenario('…', ({ Given, When, Then, And }) => { /* one call per step, text must match exactly */ });
});
```

- Top-level `await` in a spec works under the Angular builder; `loadFeature` reads from disk at test
  time and survives esbuild bundling.
- `loadFeatureFromText(text)` exists if you ever need to avoid the disk read.
- Gherkin keywords and step phrasing are **English** in this project, which is the parser default —
  do not pass a `language` option. (`loadFeature(path, { language: 'fr' })` works and the full
  official i18n table is embedded, but the `# language:` header in the file is *ignored*, so a French
  file without the option fails with a confusing `MissingExamplesError`.)

## One step = one test

Each Gherkin step becomes its own Vitest test, named
`Feature: … > Scenario: … > Given <step text>`. Consequences worth exploiting:

- Traceability from criterion to test is structural. Never duplicate the scenario in a comment.
- The red/green gauge is per step, not per scenario — much finer progress signal for the implementer.
- Setup steps (`Given`, `When`) legitimately pass before implementation; only `Then` steps should
  fail. `check-red.mjs` relies on exactly this, tracking `And`/`But` as inheriting the previous phase.
- `Background` re-runs for every scenario, as Cucumber specifies.

## Shared steps across files

`defineSteps` at module level registers into a global registry, and it crosses file boundaries as long
as the spec imports the module:

```ts
// src/testing/steps/character.steps.ts
import { defineSteps } from '@amiceli/vitest-cucumber';

defineSteps(({ Given }) => {
  Given('a character of power {number}', (_ctx, power: number) => { /* … */ });
  Given('the character knows the spell {string}', (_ctx, name: string) => { /* … */ });
});
```

A spec importing that module can then use those steps without declaring anything. Cucumber Expression
parameters (`{string}`, `{number}`) are passed after the context argument.

State shared between steps: prefer a module-scoped object exported from the steps file, or plain
closure variables inside `describeFeature`. The library also offers a `context` object, but avoid it —
see portability.

## Known limitations

**`Scenario Outline` does not compose with shared parameterised steps.** Inside an outline, matching
happens against the raw step text, placeholders included, so a shared `{number}` step will not match
`<power>`. Declare the step locally with the literal placeholder:

```ts
ScenarioOutline('…', ({ Given, Then }, variables) => {
  Given('a character of power <power>', () => { power = Number(variables['power']); });
});
```

So: either plain scenarios reusing shared vocabulary, or outlines with local steps. Pick per scenario.

**Packaging bug in 7.0.0**: `package.json` declares `bin: dist/cli-generate.js` but ships
`cli-generate.mjs`, so `pnpm add` prints a harmless bin warning and the CLI is unusable. We do not use
the CLI. If a future version fixes it, its spec-generation feature is still not something to adopt —
generating specs from features mechanically is what this skill does with judgement.

## Staying portable

The `.feature` files and the bodies of the steps are the expensive assets, and they are portable. Keep
them that way so that a runner swap costs one wrapper file rather than a rewrite:

- no custom world constructor, no library-specific hooks beyond `Background` and the standard
  `Before*`/`After*` callbacks;
- no reliance on the `context` argument threaded through steps — use module scope or closures;
- nothing in a `.feature` that is not portable Gherkin (no library-specific tag semantics).

If the dependency ever stalls, the exit is mechanical: `@cucumber/gherkin` (the official parser, one
dependency, monthly releases) plus a walker that emits `describe`/`it` and matches against the step
registry — a couple of hundred lines, and every `.feature` and step body survives untouched.

## Failure messages you will see, and what they mean

| Message | Meaning |
|---|---|
| `ScenarioNotCalledError: Scenario X was not called` | a scenario in the `.feature` has no counterpart in the spec — an uncovered criterion |
| `Missing steps in Scenario: … ❌` | a step exists in the `.feature` but not in the spec |
| `StepAbleUnknowStepError: Given … does not exist` | the spec's step text does not match the `.feature` — usually a rephrasing |
| `MissingExamplesError` | `Examples` table not parsed; almost always a non-English file without the `language` option |
| `AssertionError: expected …` | the useful red: the behaviour is missing |

The first four abort the suite before any test runs. The last is the one you want.
