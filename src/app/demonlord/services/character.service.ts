import { Injectable, inject, signal, type Signal, type WritableSignal } from '@angular/core';

import { Character } from '../demonlord-models';
import type { CharacterState } from './character-state.model';
import { CharacterStorageService } from './character-storage.service';
import { characterData as char77 } from '../characters/77';
import { characterData as duchesse } from '../characters/duchesse';
import type { DerivedAttribute } from '../components/characteristics/characteristics-models';

/** Deep clone any JSON-serializable object */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export interface CharacterMetadata {
  id: string;
  name: string;
  nickname: string;
}

/**
 * Service responsible for providing character sheet data.
 * Characters are defined as individual TypeScript files in the characters/ directory.
 * Dynamic state is persisted to localStorage and restored on reload.
 *
 * To add a new character:
 *  1. Create a new file (e.g., `characters/npc.ts`) exporting `characterData`
 *  2. Import its data below and add to `CHARACTER_DATA`
 *  3. Add its metadata to `CHARACTERS` in character.registry.ts
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly storage = inject(CharacterStorageService);

  private readonly characters = new Map<
    string,
    WritableSignal<Character | null>
  >();

  private readonly metadata: CharacterMetadata[] = [
    { id: '77', name: '7 7', nickname: 'La Tavernière' },
    { id: 'duchesse', name: 'Duchesse', nickname: '' },
  ];

  constructor() {
    // Initialize characters with loaded state
    this.characters.set('77', signal(this.createCharacter(char77)));
    this.characters.set('duchesse', signal(this.createCharacter(duchesse)));
  }

  /**
   * Create a character instance with dynamic state loaded from storage.
   * Merges static character data with any saved dynamic state.
   */
  private createCharacter(base: Character): Character {
    const state = this.storage.load(base.id);
    if (state) {
      return this.mergeState(base, state);
    }
    return this.cloneCharacter(base);
  }

  /**
   * Clone a base character with deep copies of all mutable arrays.
   */
  private cloneCharacter(base: Character): Character {
    return {
      ...base,
      derivedAttributes: deepClone(base.derivedAttributes),
      mainAttributes: deepClone(base.mainAttributes),
      activeAfflictions: [...base.activeAfflictions],
      magic: {
        ...deepClone(base.magic),
        spells: deepClone(base.magic.spells),
      },
      potions: deepClone(base.potions),
      equipment: deepClone(base.equipment),
      defense: base.defense ? { ...base.defense } : undefined,
    };
  }

  /**
   * Merge saved dynamic state into a base character.
   * Dynamic fields from state override the static defaults.
   */
  private mergeState(base: Character, state: CharacterState): Character {
    return {
      ...this.cloneCharacter(base),
      derivedAttributes: deepClone(state.derivedAttributes),
      activeAfflictions: [...state.activeAfflictions],
      magic: {
        ...deepClone(state.magic),
        spells: deepClone(state.magic.spells),
      },
      potions: deepClone(state.potions),
      defense: state.defense ? { ...state.defense } : undefined,
      money: { ...state.money },
    };
  }

  /**
   * Save dynamic state to localStorage.
   * @returns true if the character was found
   */
  private saveState(characterId: string): boolean {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return false;

    const char = charSignal();
    if (!char) return false;

    const state: CharacterState = {
      derivedAttributes: char.derivedAttributes,
      activeAfflictions: char.activeAfflictions,
      magic: char.magic,
      potions: char.potions,
      defense: char.defense,
      money: char.money,
    };

    this.storage.save(characterId, state);
    return true;
  }

  /**
   * Get a character by their ID.
   * Returns a WritableSignal so components can update character data directly.
   */
  getCharacter(id: string): WritableSignal<Character | null> {
    return this.characters.get(id) ?? signal(null);
  }

  /**
   * Update a derived attribute on a character.
   * @returns true if the attribute was found and updated
   */
  updateDerivedAttribute(
    characterId: string,
    attributeName: string,
    newValue: number
  ): boolean {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return false;

    charSignal.update((char) => {
      if (!char) return char;

      const attr = char.derivedAttributes.find(
        (a: DerivedAttribute) => a.name === attributeName
      );
      if (attr) {
        attr.value = newValue;
      }

      return { ...char, derivedAttributes: [...char.derivedAttributes] };
    });

    this.saveState(characterId);
    return true;
  }

  /**
   * Update active afflictions on a character.
   */
  updateActiveAfflictions(characterId: string, afflictions: string[]): void {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return;

    charSignal.update((char) => {
      if (!char) return char;
      return { ...char, activeAfflictions: afflictions };
    });

    this.saveState(characterId);
  }

  /**
   * Reset a character's dynamic state (clear localStorage).
   */
  resetCharacter(characterId: string): void {
    this.storage.clear(characterId);
    // Reload the character from base data
    const base = characterId === '77' ? char77 : duchesse;
    this.characters.set(characterId, signal(this.createCharacter(base)));
  }

  /**
   * Get all character metadata for listing on the home page.
   */
  getAllMetadata(): Signal<CharacterMetadata[]> {
    return signal(this.metadata);
  }

  /**
   * Get the first available character ID.
   * Useful for default redirects.
   */
  getFirstCharacterId(): string | null {
    const ids = Array.from(this.characters.keys());
    return ids.length > 0 ? ids[0] : null;
  }
}
