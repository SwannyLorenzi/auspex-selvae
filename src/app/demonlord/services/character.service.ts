import { Injectable, inject, signal, type Signal, type WritableSignal } from '@angular/core';

import { Character } from '../demonlord-models';
import type { MoneyData } from '../components/money/money-models';
import type { CharacterState } from './character-state.model';
import { CharacterStorageService } from './character-storage.service';
import { characterData as char77 } from '../characters/77';
import { characterData as duchesse } from '../characters/duchesse';

/** Deep clone any JSON-serializable object */
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

export interface CharacterMetadata {
  id: string;
  name: string;
  nickname?: string;
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
    { id: 'duchesse', name: 'Duchesse' },
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
   * Create a deep clone of a base character.
   * All mutable arrays and nested objects are deep-cloned to prevent
   * shared references between the base data and the cloned instance.
   */
  private cloneCharacter(base: Character): Character {
    return deepClone(base);
  }

  /**
   * Merge saved dynamic state into a base character.
   * Dynamic fields from state override the static defaults.
   */
  private mergeState(base: Character, state: CharacterState): Character {
    return {
      ...this.cloneCharacter(base),
      attributes: { ...state.attributes },
      activeAfflictions: [...state.activeAfflictions],
      magic: {
        ...deepClone(state.magic),
        spells: deepClone(state.magic.spells),
      },
      potions: deepClone(state.potions),
      defense: state.defense,
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
      attributes: char.attributes,
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
   * The signal reference is stable — use .set()/.update() to change the value.
   */
  getCharacter(id: string): WritableSignal<Character | null> {
    const charSignal = this.characters.get(id);
    if (charSignal) return charSignal;
    // Fallback for unknown IDs — create a stable placeholder signal
    const placeholder = signal(null);
    this.characters.set(id, placeholder);
    return placeholder;
  }

  /**
   * Update a named attribute on a character.
   * @returns true if the attribute was found and updated
   */
  updateAttribute(
    characterId: string,
    attributeName: string,
    newValue: number
  ): boolean {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return false;

    let updated = false;
    charSignal.update((char) => {
      if (!char) return char;

      const attrs = char.attributes;
      if (attrs[attributeName] !== undefined) {
        updated = true;
        return {
          ...char,
          attributes: { ...attrs, [attributeName]: newValue },
        };
      }

      return char;
    });

    if (updated) {
      this.saveState(characterId);
    }

    return updated;
  }

  /**
   * Update active afflictions on a character.
   */
  updateActiveAfflictions(characterId: string, afflictions: string[]): void {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return;

    let changed = false;
    charSignal.update((char) => {
      if (!char) return char;
      const current = char.activeAfflictions;
      if (current.length === afflictions.length && current.every((a, i) => a === afflictions[i])) {
        return char;
      }
      changed = true;
      return { ...char, activeAfflictions: [...afflictions] };
    });

    if (changed) {
      this.saveState(characterId);
    }
  }

  /**
   * Reset a character's dynamic state (clear localStorage).
   * Updates the signal value in place — the signal reference stays stable
   * so that all components holding a reference to it re-render.
   */
  resetCharacter(characterId: string): void {
    this.storage.clear(characterId);
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return;
    const base = characterId === '77' ? char77 : duchesse;
    charSignal.set(this.createCharacter(base));
  }

  /**
   * Get all character metadata for listing on the home page.
   */
  getAllMetadata(): Signal<CharacterMetadata[]> {
    return signal(this.metadata);
  }

  /**
   * Record a spell use (increment currentUses).
   */
  spellUse(characterId: string, spellName: string): void {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return;

    let changed = false;
    charSignal.update((char) => {
      if (!char) return char;
      const spells = char.magic.spells.map((s) =>
        s.name === spellName ? { ...s, currentUses: s.currentUses + 1 } : s,
      );
      changed = true;
      return { ...char, magic: { ...char.magic, spells } };
    });

    if (changed) {
      this.saveState(characterId);
    }
  }

  /**
   * Reset all spell uses to 0.
   */
  resetSpellUses(characterId: string): void {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return;

    let changed = false;
    charSignal.update((char) => {
      if (!char) return char;
      const spells = char.magic.spells.map((s) => ({ ...s, currentUses: 0 }));
      changed = true;
      return { ...char, magic: { ...char.magic, spells } };
    });

    if (changed) {
      this.saveState(characterId);
    }
  }

  /**
   * Update the money data for a character.
   * Persists to localStorage automatically.
   */
  updateMoney(characterId: string, money: MoneyData): void {
    const charSignal = this.characters.get(characterId);
    if (!charSignal) return;

    charSignal.update((char) => {
      if (!char) return char;
      if (char.money.totalShards === money.totalShards) return char;
      return { ...char, money: { ...money } };
    });

    this.saveState(characterId);
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
