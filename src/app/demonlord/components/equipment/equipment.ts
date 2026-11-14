import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Equipment, type Character } from './equipment-models';
import { MoneyComponent } from '../money/money';

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
}
