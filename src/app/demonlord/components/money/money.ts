import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';

import { CharacterService } from '../../services/character.service';
import { type MoneyData } from './money-models';

/** Break total shards into co/ca/sc/e amounts. */
function breakDownShards(total: number): Record<'co' | 'ca' | 'sc' | 'e', number> {
  const e = total % 10;
  const remaining = (total - e) / 10;
  const sc = remaining % 10;
  const remaining2 = (remaining - sc) / 10;
  const ca = remaining2 % 10;
  const co = (remaining2 - ca) / 10;
  return { co, ca, sc, e };
}

interface CurrencyDef {
  key: 'co' | 'ca' | 'sc' | 'e';
  label: string;
  unit: string;
}

interface CurrencyRow {
  key: 'co' | 'ca' | 'sc' | 'e';
  label: string;
  unit: string;
  value: number;
}

const CURRENCIES: CurrencyDef[] = [
  { key: 'co', label: "Couronnes d'Or", unit: 'co' },
  { key: 'ca', label: "Chelins d'Argent", unit: 'ca' },
  { key: 'sc', label: 'Sous de Cuivre', unit: 'sc' },
  { key: 'e', label: 'Éclats', unit: 'e' },
];

@Component({
  selector: 'app-money',
  imports: [],
  templateUrl: './money.html',
  styleUrl: './money.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneyComponent {
  /** Character ID, needed to call CharacterService.updateMoney(). */
  characterId = input.required<string>();

  /** The money data (single total in shards). */
  money = input.required<MoneyData>();

  private readonly characterService = inject(CharacterService);

  /** Breakdown of totalShards into co/ca/sc/e. */
  protected readonly breakdown = computed<Record<'co' | 'ca' | 'sc' | 'e', number>>(() =>
    breakDownShards(this.money().totalShards),
  );

  /** Currency rows with computed values. */
  protected readonly currencyRows = computed<CurrencyRow[]>(() =>
    CURRENCIES.map((c) => ({ ...c, value: this.breakdown()[c.key] })),
  );

  /** Return the shard multiplier for a currency key. */
  protected getMultiplier(key: 'co' | 'ca' | 'sc' | 'e'): number {
    return { co: 1000, ca: 100, sc: 10, e: 1 }[key];
  }

  /** Add a given number of shards. */
  protected addShards(amount: number): void {
    const money = this.money();
    this.characterService.updateMoney(this.characterId(), {
      totalShards: money.totalShards + amount,
    });
  }

  /** Remove a given number of shards (never below 0). */
  protected removeShards(amount: number): void {
    const money = this.money();
    const newValue = Math.max(0, money.totalShards - amount);
    if (newValue === money.totalShards) return;
    this.characterService.updateMoney(this.characterId(), { totalShards: newValue });
  }
}
