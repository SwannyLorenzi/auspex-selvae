/**
 * Max number of uses a character has for a spell, based on
 * their power level (0–10) and the spell's level (0–10).
 */
const maxUses: number[][] = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // power 0
  [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], // power 1
  [3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0], // power 2
  [4, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0], // power 3
  [5, 2, 2, 1, 1, 0, 0, 0, 0, 0, 0], // power 4
  [6, 3, 2, 2, 1, 1, 0, 0, 0, 0, 0], // power 5
  [7, 3, 2, 2, 2, 1, 1, 0, 0, 0, 0], // power 6
  [8, 3, 2, 2, 2, 1, 1, 1, 0, 0, 0], // power 7
  [9, 3, 3, 2, 2, 2, 1, 1, 1, 0, 0], // power 8
  [10, 3, 3, 3, 2, 2, 1, 1, 1, 1, 0], // power 9
  [11, 3, 3, 3, 3, 2, 1, 1, 1, 1, 1], // power 10
];

export function getMaxUses(power: number, spellLevel: number): number {
  if (power < 0 || power > 10) throw new RangeError();
  if (spellLevel < 0 || spellLevel > 10) throw new RangeError();
  return maxUses[power][spellLevel];
}
