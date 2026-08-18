import { Component, input } from '@angular/core';
import { Equipment } from './equipment-models';

@Component({
  selector: 'app-equipment',
  imports: [],
  templateUrl: './equipment.html',
  styleUrl: './equipment.scss',
})
export class EquipmentComponent {
  currency = input.required<string>();
  equipment = input.required<Equipment[]>();
}
