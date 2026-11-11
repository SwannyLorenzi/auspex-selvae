import { characterMetadata as meta77 } from './77';

/**
 * Registry of all available character sheets.
 * Add a new character by:
 *  1. Creating a new file (e.g., `characters/npc.ts`) that exports `characterData`
 *  2. Importing its metadata below and adding it to the `CHARACTERS` array
 */
export const CHARACTERS = [meta77] as const;

export type CharacterId = (typeof CHARACTERS)[number]['id'];
