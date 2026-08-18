import {
  Attribute,
  DerivedAttribute,
} from './components/characteristics/characteristics-models';
import { Equipment } from './components/equipment/equipment-models';
import { Magic } from './components/magic/magic-models';
import { Potion } from './components/master-brewer/master-brewer-models';
import { Profession } from './components/professions/professions-models';
import { Progression } from './components/progression/progression-models';

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
