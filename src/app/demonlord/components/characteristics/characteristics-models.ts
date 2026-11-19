/**
 * All character attributes as a flat object with named properties.
 * The CharacteristicsComponent handles grouping, bonus calculation,
 * and distinguishing static vs dynamic values.
 */
export interface CharacterData extends Record<string, number> {
  // Core stats (dice rolls)
  force: number;
  intellect: number;
  agility: number;
  willpower: number;
  perception: number;

  // Static values
  health: number;
  speed: number;
  size: number;
  spellpower: number;
  healingRate: number;
  defense: number;

  // Dynamic values
  damage: number;
  madness: number;
  corruption: number;
}

/** @deprecated Use CharacterData instead */
export interface Attribute { name: string; value: number; bonus?: string; bonusText?: string }

/** @deprecated Use CharacterData instead */
export interface DerivedAttribute { name: string; value: number; formula: string }
