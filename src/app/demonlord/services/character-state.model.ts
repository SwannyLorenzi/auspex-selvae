import { CharacterData } from '../components/characteristics/characteristics-models';
import { MoneyData } from '../components/money/money-models';
import { Magic } from '../components/magic/magic-models';
import { Potion } from '../components/master-brewer/master-brewer-models';

/**
 * Dynamic character state that changes during gameplay.
 * This is the part that gets persisted to localStorage.
 * Only the "dynamic" attributes (damage, madness, corruption) are persisted.
 */
export interface CharacterState {
  attributes: CharacterData;
  activeAfflictions: string[];
  magic: Magic;
  potions: Potion[];
  defense?: number;
  money: MoneyData;
}
