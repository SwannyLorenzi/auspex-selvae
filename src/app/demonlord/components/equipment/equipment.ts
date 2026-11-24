import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
} from '@angular/core';

import { type Character } from '../../demonlord-models';
import {
  type Equipment,
  type WeaponEquipment,
  type ArmorEquipment,
  type InventoryEquipment,
} from './equipment-models';
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
  character = input.required<Character>();
  equipment = input.required<Equipment[]>();

  groups = computed<CategoryGroup[]>(() => {
    const categories = [
      { key: 'weapon', label: 'Armes' },
      { key: 'armor', label: 'Armures' },
      { key: 'inventory', label: 'Inventaire' },
    ];

    return categories
      .map((cat) => ({
        ...cat,
        items: this.equipment().filter((item) => item.category === cat.key),
      }))
      .filter((group) => group.items.length > 0);
  });
}
