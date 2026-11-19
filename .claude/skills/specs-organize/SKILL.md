---
name: specs-organize
description: Audit, classify and reorganize scattered documentation and spec files before or after a feature launch. Use when docs, specs, mockups, or reference images are scattered across directories and need cleaning — especially after ambitious features.
---

# Specs organize — clean up before you ship

## When to use

Invoke this skill whenever documentation, specs, mockups, or reference assets have accumulated in a messy state — especially after completing (or significantly advancing) an ambitious feature. Typical triggers:

- You've just refactored a major component and `docs/` is full of obsolete plans, mockups, and duplicates
- A new feature is being built and spec files are scattered across the repo
- You're about to ship a feature and want to ensure the docs structure is clean
- The user asks to "organize the docs", "clean up specs", or "do the specs-organize"

## The procedure

Follow these steps in order. Do not skip steps.

### Step 1 — Audit

Scan the repo for documentation and spec-related files. Look in:

- `docs/` (most common)
- `docs/assets/` or any subdirectories
- `assets/` at root level
- Any `references/`, `specs/`, or `design/` directories
- Any `.html` mockups, `.md` plans, `.jpg`/`.png` reference images

Build a mental map of what exists and what each file actually is.

### Step 2 — Classify

For each file found, determine its category:

| Category | Destination | What goes here |
|----------|-------------|----------------|
| **Spec** | `/specs/<feature>/` | Design specs, technical decisions, architecture docs, rule documentation |
| **Reference** | `/specs/<feature>/` | Reference images, screenshots, example sheets, mockup images |
| **Obsolete** | DELETE | Completed refactor plans, executed checklists, outdated mockups (HTML) |
| **Duplicate** | DELETE | Files already present elsewhere in the repo (check `src/`) |

Rules for classification:
- A `.md` file that documents decisions, rules, or design → **spec**
- A `.md` plan that describes steps to implement → **obsolete** (if the implementation is done)
- An HTML file that is a visual mockup/wireframe → **obsolete** (if the feature is implemented)
- An image that is a reference example (official sheet, screenshot) → **reference**
- An image already copied to `src/` → **duplicate**

### Step 3 — Restructure

Create the target directory structure:

```
/specs/<feature>/
  <spec-file>.md          → specs/<feature>/
  <reference-image>.jpg    → specs/<feature>/
```

Use `git mv` to preserve history. Create directories as needed.

Target structure:
- `/specs/` at repo root — the canonical location for all specs and references
- `/specs/<feature>/` — one subdirectory per feature (e.g., `specs/demonlord/`, `specs/combat/`)
- Keep filenames descriptive and unchanged (don't rename, just move)

### Step 4 — Clean up

Delete files that are obsolete or duplicates:
- Removed plans, executed checklists
- Outdated HTML mockups (the code replaced them)
- Duplicate images already in `src/`
- Empty directories (remove them too)

### Step 5 — Commit

Create a single commit for the entire reorganization:

```
refactor(docs): organize specs for <feature-name>

- Move <files> → specs/<feature>/
- Delete <obsolete-files>
- Remove empty directories
```

Use conventional commits format with `refactor(docs):` prefix.

## Output structure

After organization, the repo should have:

```
/specs/
  <feature1>/
    <spec>.md
    <reference>.jpg
  <feature2>/
    <spec>.md
```

The `docs/` directory may be:
- **Emptied and removed** if it contained only obsolete/duplicate files
- **Kept with minimal content** if it still holds user-facing docs (README, guides)
- **Replaced by `/specs/`** as the primary documentation location

## Examples

### Example 1: Post-feature cleanup (the typical case)

Before:
```
docs/
  feature-spec.md
  refactor-plan.md
  mockup.html
  mockup-ko.html
  reference.jpg
  logo.webp         (duplicate of src/app/.../logo.webp)
  assets/
    logo.webp        (duplicate)
```

After:
```
specs/
  feature/
    feature-spec.md
    reference.jpg
docs/   (removed — was empty)
```

### Example 2: Multi-feature cleanup

Before:
```
docs/
  combat-spec.md
  magic-plan.md
  inventory.html
  character-sheet.jpg
  magic-sheet.jpg
```

After:
```
specs/
  combat/
    combat-spec.md
  magic/
    magic-plan.md
  inventory/
  characters/
    character-sheet.jpg
    magic-sheet.jpg
docs/ (removed or kept with remaining content)
```

## Important notes

- **Never delete without verifying**: Check each file's content before deleting. A plan might still be relevant if the feature isn't complete.
- **Check for duplicates before deleting**: Search `src/` for images before removing them from docs.
- **Use `git mv` for moves**: This preserves git history for moved files.
- **One commit for all changes**: The reorganization is atomic — all moves and deletes in a single commit.
- **The `/specs/` directory goes at repo root**: Not in `docs/`. This keeps specs separate from user-facing documentation.
