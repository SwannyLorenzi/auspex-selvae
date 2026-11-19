---
name: specs-organize
description: Audit, classify and reorganize scattered documentation and spec files for multi-game projects. Use when docs, specs, mockups, or reference images are scattered across directories and need cleaning — especially after ambitious features. The target structure is /specs/<game>/<feature>/ (e.g. specs/demonlord/characters/, specs/demonlord/combat/).
---

# Specs organize — clean up before you ship

## When to use

Invoke this skill whenever documentation, specs, mockups, or reference assets have accumulated in a messy state — especially after completing (or significantly advancing) an ambitious feature. Typical triggers:

- You've just refactored a major component and `docs/` is full of obsolete plans, mockups, and duplicates
- A new feature is being built and spec files are scattered across the repo
- You're about to ship a feature and want to ensure the docs structure is clean
- The user asks to "organize the docs", "clean up specs", or "do the specs-organize"

## Target structure

The repo uses a **multi-game** structure under `/specs/`:

```
specs/
  <game>/                    # e.g. demonlord, starfinder, pf2e
    <feature>.md             # spec for a feature (pentagram-spec.md)
    <reference>.jpg          # reference image (sheet, screenshot)
    characters/              # character sheets, NPCs, handouts
      <character>.md
    systems/                 # game systems (combat, magic, inventory)
      <system-spec>.md
    assets/                  # shared images, logos, icons
```

Rules:
- **`/specs/<game>/`** — one subdirectory per supported game (demonlord, starfinder, etc.)
- **`/specs/<game>/<feature>.md`** — specs and design docs at the game level
- **`/specs/<game>/characters/`** — character sheets, NPCs, handouts
- **`/specs/<game>/systems/`** — game system specs (combat, magic, inventory)
- **`/specs/<game>/assets/`** — shared images, logos, icons

## The procedure

Follow these steps in order. Do not skip steps.

### Step 1 — Audit

Scan the repo for documentation and spec-related files. Look in:

- `docs/` (most common)
- `docs/assets/` or any subdirectories
- `assets/` at root level
- Any `references/`, `specs/`, or `design/` directories
- Any `.html` mockups, `.md` plans, `.jpg`/`.png` reference images
- Any `.md` character sheets or handouts at repo root

Build a mental map of what exists and what each file actually is.

### Step 2 — Classify

For each file found, determine its category:

| Category | Destination | What goes here |
|----------|-------------|----------------|
| **Spec** | `/specs/<game>/<feature>.md` | Design specs, technical decisions, architecture docs, rule documentation |
| **Reference** | `/specs/<game>/` | Reference images, screenshots, example sheets, mockup images |
| **Character sheet** | `/specs/<game>/characters/` | Character sheets, NPC sheets, handouts |
| **System spec** | `/specs/<game>/systems/` | Game system docs (combat, magic, inventory) |
| **Obsolete** | DELETE | Completed refactor plans, executed checklists, outdated mockups (HTML) |
| **Duplicate** | DELETE | Files already present elsewhere in the repo (check `src/`) |

Rules for classification:
- A `.md` file that documents decisions, rules, or design → **spec**
- A `.md` plan that describes steps to implement → **obsolete** (if the implementation is done)
- An HTML file that is a visual mockup/wireframe → **obsolete** (if the feature is implemented)
- An image that is a reference example (official sheet, screenshot) → **reference**
- A character sheet or NPC sheet → **character sheet**
- An image already copied to `src/` → **duplicate**
- Identify the **game** for each file (demonlord, starfinder, etc.) — this determines the top-level subdirectory

### Step 3 — Restructure

Create the target directory structure:

```
specs/<game>/
  <spec-file>.md          → specs/<game>/
  <reference-image>.jpg    → specs/<game>/
  characters/
    <character-sheet>.md  → specs/<game>/characters/
```

Use `git mv` to preserve history. Create directories as needed.

Target structure:
- `/specs/` at repo root — the canonical location for all specs and references
- `/specs/<game>/` — one subdirectory per supported game
- `/specs/<game>/characters/` — character sheets and NPCs
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
refactor(docs): organize specs for <game-name>

- Move <files> → specs/<game>/
- Move <character-sheets> → specs/<game>/characters/
- Delete <obsolete-files>
- Remove empty directories
```

Use conventional commits format with `refactor(docs):` prefix.

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
  demonlord/
    feature-spec.md
    reference.jpg
docs/   (removed — was empty)
```

### Example 2: Character sheets reorganization

Before:
```
Duchesse.md
7 7 - La Tavernière.md
```

After:
```
specs/
  demonlord/
    characters/
      duchesse.md
      7-7-taverniere.md
```

### Example 3: Multi-game cleanup

Before:
```
docs/
  combat-spec.md
  magic-plan.md
  character-sheet.jpg
  starfinder-sheet.md
```

After:
```
specs/
  demonlord/
    combat-spec.md
    magic-plan.md
    character-sheet.jpg
  starfinder/
    starfinder-sheet.md
docs/ (removed or kept with remaining content)
```

## Important notes

- **Never delete without verifying**: Check each file's content before deleting. A plan might still be relevant if the feature isn't complete.
- **Check for duplicates before deleting**: Search `src/` for images before removing them from docs.
- **Use `git mv` for moves**: This preserves git history for moved files.
- **One commit for all changes**: The reorganization is atomic — all moves and deletes in a single commit.
- **The `/specs/` directory goes at repo root**: Not in `docs/`. This keeps specs separate from user-facing documentation.
- **Identify the game early**: When you find a file, determine which game it belongs to. This determines the top-level subdirectory under `/specs/`.
- **Pre-create game directories**: When you encounter a new game, create the `/specs/<game>/` and `/specs/<game>/characters/` directories upfront.
