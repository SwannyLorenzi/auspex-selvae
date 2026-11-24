import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
} from '@angular/core';

import { type Character } from '../../demonlord-models';
import { type Equipment } from './equipment-models';
import { CharacterService } from '../../services/character.service';

interface CategoryGroup {
  key: string;
  label: string;
  items: Equipment[];
}

@Component({
  selector: 'app-equipment',
  imports: [],
  templateUrl: './equipment.html',
  styleUrl: './equipment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentComponent {
  private characterService = inject(CharacterService);

  character = input.required<Character>();
  equipment = input.required<Equipment[]>();
  characterId = input.required<string>();

  protected updateQuantity = (itemName: string, delta: number): void => {
    const charId = this.characterId();
    const eq = this.equipment();
    const item = eq.find((e) => e.name === itemName);
    if (!item) return;
    const current = item.quantity;
    this.characterService.updateEquipmentQuantity(charId, itemName, Math.max(0, current + delta));
  };

  protected groups = computed<CategoryGroup[]>(() => {
    const eq = this.equipment();
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
          .map((item) => ({ ...item })),
      }))
      .filter((group) => group.items.length > 0);
  });

  protected trackByItemName = (_: number, item: { name: string }): string =>
    item.name;
}
