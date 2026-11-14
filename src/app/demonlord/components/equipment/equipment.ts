import { Component, ChangeDetectionStrategy, input } from '@angular/core';

import { type Character } from '../../demonlord-models';
import { type Equipment } from './equipment-models';

@Component({
  selector: 'app-equipment',
  imports: [],
  templateUrl: './equipment.html',
  styleUrl: './equipment.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentComponent {
  character = input.required<Character>();
  equipment = input.required<Equipment[]>();
}
