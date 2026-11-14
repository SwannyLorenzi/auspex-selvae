import {
  Attribute,
  DerivedAttribute,
} from './components/characteristics/characteristics-models';
import { DefenseData } from './components/characteristics/defense/defense-models';
import { Equipment } from './components/equipment/equipment-models';
import { MoneyData } from './components/money/money-models';
import { Magic } from './components/magic/magic-models';
import { Potion } from './components/master-brewer/master-brewer-models';
import { Profession } from './components/professions/professions-models';
import { Progression } from './components/progression/progression-models';

export interface Character {
  id: string;
  name: string;
  nickname?: string;
  description: string;
  progression: Progression;
  professions: Profession[];
  mainAttributes: Attribute[];
  derivedAttributes: DerivedAttribute[];
  immunities: string[];
  talents: string[];
  activeAfflictions: string[];
  magic: Magic;
  potions: Potion[];
  equipment: Equipment[];
  money: MoneyData;
  defense?: DefenseData;
}
