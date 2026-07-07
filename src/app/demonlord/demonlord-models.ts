import { Magic } from './components/magic/magic-models';

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
