import { MoneyData } from '../money/money-models';

export interface Equipment {
  name: string;
  effect: string;
  isSeparator?: boolean;
}

export interface Character {
  money: MoneyData;
}
