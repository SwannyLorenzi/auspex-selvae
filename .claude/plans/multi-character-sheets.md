# Plan: Multi-Character Sheet Support for Demonlord

## Context

The project is an Angular standalone-component app that displays Demonlord (tabletop RPG) character sheets. Currently:
- **Home page** (`/home`) has a hardcoded list with one character ("7 7") linking to `/demonlord`
- **Demonlord page** (`/demonlord`) imports `characterData` directly from `demonlord-data.ts` and passes it to all child components
- All sub-components use `input()` — they receive data as inputs, never access data directly

The goal is to support multiple characters, each in its own file, with a character selection UI on the home page.

## Current Architecture

```
src/app/
├── app.routes.ts          → routes: '' → 'home', 'home' → HomeComponent, 'demonlord' → DemonlordComponent
├── app.ts                 → <app-root> with RouterOutlet
├── home/home.ts           → HomeComponent with hardcoded characters array
└── demonlord/
    ├── demonlord-data.ts  → single characterData: Character (341 lines of hardcoded data)
    ├── demonlord-models.ts → Character interface + all sub-models
    └── demonlord.ts       → DemonlordComponent { character = characterData }
```

## Implementation Plan

### Step 1: Create character data files

Create `src/app/demonlord/characters/` directory with individual JSON files.

**Format**: JSON files with a `metadata` object and character data. This gives us versioning, validation, and a clean separation:

```json
{
  "metadata": {
    "id": "77",
    "name": "7 7",
    "nickname": "La Tavernière",
    "version": "1.0.0"
  },
  "character": { /* same structure as current characterData */ }
}
```

- **Why JSON with metadata**: Easy to version, easy to edit by hand, version-controlled, the metadata block lets us list characters without parsing the full character data.
- **Alternative considered**: TypeScript files with exports — rejected because JSON is simpler to edit, doesn't require a build step, and is more portable.
- **File path**: `src/app/demonlord/characters/77.json`

For now, extract the existing `characterData` into this file. The structure stays identical to `demonlord-data.ts`'s `characterData`.

### Step 2: Create a CharacterService

**File**: `src/app/demonlord/services/character.service.ts`

A singleton service (`providedIn: 'root'`) that:
- Loads character data from JSON files (using `fetch` for static assets, or `HttpClient` if already configured)
- Provides characters via a signal or observable
- Has a `getCharacter(id: string)` method
- Has a `getAllCharacters()` method returning metadata for the home page list

```typescript
export class CharacterService {
  private characters = signal<Map<string, Character>>(new Map());
  private metadata = signal<CharacterSheet[]>([]);

  loadAll(): void { /* fetch all JSON files from characters/ folder */ }
  getCharacter(id: string): Signal<Character | null> { ... }
  getAllMetadata(): Signal<CharacterSheet[]> { ... }
}
```

- **Why service over route resolver**: Services are simpler for static data, work well with Angular signals, and don't complicate routing.
- **Why not lazy-load per route**: All sheets are small; pre-loading at startup is faster and simpler.

### Step 3: Update routes to include character ID

**File**: `src/app/app.routes.ts`

Change the demonlord route to accept a path parameter:

```typescript
{ path: 'demonlord/:characterId', component: DemonlordComponent },
```

- Add a route for the home page to be the default: `{ path: '', redirectTo: 'home', pathMatch: 'full' }`
- Optionally add a route that redirects `/demonlord` to the first character

### Step 4: Update DemonlordComponent to use the service

**File**: `src/app/demonlord/demonlord.ts`

- Remove the direct import of `characterData`
- Inject `CharacterService`
- Use `inject(ActivatedRoute)` to get the `characterId` from the URL
- Create a computed signal: `character = computed(() => this.characterService.getCharacter(this.characterId()))`
- Pass the character to all sub-components via the same inputs as before (no change to child components needed)

### Step 5: Update HomeComponent to use the service

**File**: `src/app/home/home.ts`

- Inject `CharacterService`
- Replace the hardcoded `characters` array with `this.characterService.getAllMetadata()`
- Update `routerLink` to use the character ID path: `[routerLink]="['/demonlord', char.id]"`

### Step 6: Clean up

- Remove `demonlord-data.ts` (no longer needed)
- Update any imports that reference the old paths

## Files to Modify

| File | Action |
|------|--------|
| `src/app/demonlord/characters/77.json` | **Create** — extract characterData |
| `src/app/demonlord/services/character.service.ts` | **Create** — service for loading/managing characters |
| `src/app/app.routes.ts` | **Modify** — add `:characterId` route param |
| `src/app/demonlord/demonlord.ts` | **Modify** — use CharacterService + route param |
| `src/app/home/home.ts` | **Modify** — use CharacterService for character list |
| `src/app/demonlord/demonlord-data.ts` | **Delete** — data extracted to JSON |

## Verification

1. **Build**: Run `ng build` to ensure no compilation errors
2. **Home page**: Navigate to `/home` — should display "7 7" character card linking to `/demonlord/77`
3. **Character page**: Navigate to `/demonlord/77` — should display the full character sheet identical to current behavior
4. **Add a second character**: Create `characters/another.json`, verify it appears on the home page and loads correctly
5. **Navigation**: Click character card from home → character page; use back button → home page
6. **Tests**: Run `ng test` and fix any broken specs (especially `demonlord.spec.ts` and `home.spec.ts`)
