import { DefenseData } from '../components/characteristics/defense/defense-models';
import { MoneyData } from '../components/money/money-models';
import { Magic } from '../components/magic/magic-models';
import { Potion } from '../components/master-brewer/master-brewer-models';
import { DerivedAttribute } from '../components/characteristics/characteristics-models';

/**
 * Dynamic character state that changes during gameplay.
 * This is the part that gets persisted to localStorage.
 */
export interface CharacterState {
  derivedAttributes: DerivedAttribute[];
  activeAfflictions: string[];
  magic: Magic;
  potions: Potion[];
  defense?: DefenseData;
  money: MoneyData;
}
