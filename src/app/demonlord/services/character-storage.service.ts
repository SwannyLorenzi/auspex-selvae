import { Injectable } from '@angular/core';

import { CharacterState } from './character-state.model';

const STORAGE_PREFIX = 'auspex_charState_';

/**
 * Storage service for character game state.
 * Persists dynamic character data (damage, spells, afflictions, money, etc.) to localStorage.
 * Survives page reloads and supports multiple characters.
 */
@Injectable({
  providedIn: 'root',
})
export class CharacterStorageService {
  /**
   * Load saved state for a character from localStorage.
   * Returns null if no saved state exists.
   */
  load(characterId: string): CharacterState | null {
    try {
      const raw = localStorage.getItem(`${STORAGE_PREFIX}${characterId}`);
      if (!raw) return null;
      return JSON.parse(raw) as CharacterState;
    } catch {
      return null;
    }
  }

  /**
   * Save character state to localStorage.
   */
  save(characterId: string, state: CharacterState): void {
    try {
      localStorage.setItem(
        `${STORAGE_PREFIX}${characterId}`,
        JSON.stringify(state)
      );
    } catch {
      // Storage full or unavailable — silently fail
    }
  }

  /**
   * Clear saved state for a character.
   */
  clear(characterId: string): void {
    try {
      localStorage.removeItem(`${STORAGE_PREFIX}${characterId}`);
    } catch {
      // ignore
    }
  }

  /**
   * Clear all saved character states.
   */
  clearAll(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(STORAGE_PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    } catch {
      // ignore
    }
  }
}
