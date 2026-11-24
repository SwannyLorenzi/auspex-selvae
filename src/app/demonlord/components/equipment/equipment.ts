import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  ChangeDetectorRef,
  inject,
} from '@angular/core';

import { type Character } from '../../demonlord-models';
import { type Equipment } from './equipment-models';
import { MoneyComponent } from '../money/money';

interface CategoryGroup {
  key: string;
  label: string;
  items: Equipment[];
}

@Component({
  selector: 'app-equipment',
  imports: [MoneyComponent],
  templateUrl: './equipment.html',
  styleUrl: './equipment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentComponent {
  private cdr = inject(ChangeDetectorRef);

  character = input.required<Character>();
  equipment = input.required<Equipment[]>();

  private quantities = new Map<string, number>();

  protected updateQuantity = (itemName: string, delta: number): void => {
    const current = this.quantities.get(itemName) ?? 0;
    this.quantities.set(itemName, Math.max(0, current + delta));
    this.cdr.markForCheck();
  };

  protected groups = computed<CategoryGroup[]>(() => {
    const eq = this.equipment();
    // Initialize quantities for items not yet tracked
    for (const item of eq) {
      if (!this.quantities.has(item.name)) {
        this.quantities.set(item.name, item.quantity);
      }
    }
    const categories = [
      { key: 'weapon', label: 'Armes' },
      { key: 'armor', label: 'Armures' },
      { key: 'inventory', label: 'Inventaire' },
    ];

    return categories
      .map((cat) => ({
        ...cat,
        items: eq
          .filter((item) => item.category === cat.key)
          .map((item) => ({
            ...item,
            quantity: this.quantities.get(item.name) ?? item.quantity,
          })),
      }))
      .filter((group) => group.items.length > 0);
  });

  protected trackByItemName = (_: number, item: { name: string }): string =>
    item.name;
}
