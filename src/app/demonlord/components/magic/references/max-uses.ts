/**
 * Max number of uses a character has for a spell, based on
 * their power level (0–10) and the spell's level (0–10).
 */
const maxUses: number[][] = [
   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // puissance 0
   [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // puissance 1
   [3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0],  // puissance 2
   [4, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],  // puissance 3
   [5, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0],  // puissance 4
   [6, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0],  // puissance 5
   [7, 3, 2, 2, 2, 1, 1, 0, 0, 0, 0],  // puissance 6
   [8, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0],  // puissance 7
   [9, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0],  // puissance 8
   [10, 3, 3, 3, 2, 2, 1, 1, 1, 1, 0],  // puissance 9
   [11, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1],  // puissance 10
];

export function getMaxUses(puissance: number, spellLevel: number): number {
   if (puissance < 0 || puissance > 10) throw new RangeError();
   if (spellLevel < 0 || spellLevel > 10) throw new RangeError();
   return maxUses[puissance][spellLevel];
}
