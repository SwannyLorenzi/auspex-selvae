export interface Character {
  name: string;
  nickname: string;
  description: string;
  progression: Progression;
  professions: Profession[];
  mainAttributes: Attribute[];
  derivedAttributes: DerivedAttribute[];
  immunities: string[];
  talents: string[];
  magic: Magic;
  potions: Potion[];
  equipment: Equipment[];
  currency: string;
}

export enum SourceBook {
  CORE = 'Livre de base',
  COMPANION = 'Compagnon',
  PHILOSOPHY = 'Philosophie Occulte'
}

export type SpellMainAttributes = 'Intellect' | 'Volonté';

export enum SpellType {
  UTILITY = 'Utilitaire',
  ATTACK = 'Attaque'
}

export interface Progression {
  level: string;
  ascendance: string;
  apprentice: string;
  expert: string;
  master: string;
}

export interface Profession {
  name: string;
}

export interface Attribute {
  name: string;
  value: number;
  bonus?: string;
  bonusText?: string;
}

export interface DerivedAttribute {
  name: string;
  value: number;
  formula: string;
}

export interface Magic {
  spells: Spell[];
  power: number;
}

export interface Tradition {
  name: string;
  mainAttributes: SpellMainAttributes;
  corrupted: boolean;
}

export interface Spell {
  name: string;
  level: number;
  tradition: Tradition;
  type: SpellType;
  currentUses: number;
  target?: string;
  duration?: string;
  areaOfEffect?: string;
  conditions?: string;
  effect: string; /* main spell effect */
  triggered?: string; /* special effect when triggered */
  sacrifice?: string; /* special effect when a spell use is spent */
  bonus20Plus?: string; /* additional effect on 20+ on dice roll */
  foundIn: SourceBook;
}

export interface Potion {
  name: string;
  cost: string;
  effect: string;
}

export interface Equipment {
  name: string;
  effect: string;
  isSeparator?: boolean;
}
