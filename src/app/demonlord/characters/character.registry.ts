import { characterData as char77 } from './77';
import { characterData as duchesse } from './duchesse';

/**
 * Registry of all available character sheets.
 * Add a new character by:
 *  1. Creating a new file (e.g., `characters/npc.ts`) that exports `characterData`
 *  2. Importing its data below and adding it to the `CHARACTERS` array
 */
export const CHARACTERS = [char77, duchesse] as const;

export type CharacterId = (typeof CHARACTERS)[number]['id'];
