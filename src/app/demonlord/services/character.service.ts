import { Injectable, computed, signal, type Signal } from '@angular/core';

import type { Character } from '../demonlord-models';
import { characterData as char77 } from '../characters/77';

export interface CharacterMetadata {
  id: string;
  name: string;
  nickname: string;
}

/**
 * Service responsible for providing character sheet data.
 * Characters are defined as individual TypeScript files in the characters/ directory.
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
  private readonly characters = new Map<string, Character>([
    ['77', char77],
  ]);

  private readonly metadata: CharacterMetadata[] = [
    { id: '77', name: '7 7', nickname: 'La Tavernière' },
  ];

  /**
   * Get a character by their ID.
   */
  getCharacter(id: string): Signal<Character | null> {
    return computed(() => this.characters.get(id) ?? null);
  }

  /**
   * Get all character metadata for listing on the home page.
   */
  getAllMetadata(): Signal<CharacterMetadata[]> {
    return computed(() => this.metadata);
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
