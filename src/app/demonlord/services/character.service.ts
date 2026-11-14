import { Injectable, signal, type Signal, type WritableSignal } from '@angular/core';

import type { Character } from '../demonlord-models';
import type { DerivedAttribute } from '../components/characteristics/characteristics-models';
import { characterData as char77 } from '../characters/77';
import { characterData as duchesse } from '../characters/duchesse';
import { CHARACTERS } from '../characters/character.registry';

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
  private readonly characters = new Map<
    string,
    WritableSignal<Character | null>
  >([
    [
      '77',
      signal({ ...char77, derivedAttributes: [...char77.derivedAttributes] }),
    ],
    [
      'duchesse',
      signal({
        ...duchesse,
        derivedAttributes: [...duchesse.derivedAttributes],
      }),
    ],
  ]);

  private readonly metadata: CharacterMetadata[] = [
    { id: '77', name: '7 7', nickname: 'La Tavernière' },
    { id: 'duchesse', name: 'Duchesse', nickname: '' },
  ];

  /**
   * Get a character by their ID.
   */
  getCharacter(id: string): Signal<Character | null> {
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
