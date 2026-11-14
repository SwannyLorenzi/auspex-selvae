import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { type MoneyData } from './money-models';

interface CurrencyDef {
  key: 'couronnes' | 'chelins' | 'sous' | 'eclats';
  label: string;
  unit: string;
}

const CURRENCIES: CurrencyDef[] = [
  { key: 'couronnes', label: 'Couronnes d\'Or', unit: 'co' },
  { key: 'chelins', label: 'Chelins d\'Argent', unit: 'ca' },
  { key: 'sous', label: 'Sous de Cuivre', unit: 'sc' },
  { key: 'eclats', label: 'Éclats', unit: 'e' },
];

@Component({
  selector: 'app-money',
  imports: [],
  templateUrl: './money.html',
  styleUrl: './money.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyComponent {
  money = input.required<MoneyData>();
  protected readonly currencies = CURRENCIES;
}
