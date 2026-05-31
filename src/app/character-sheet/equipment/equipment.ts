import { Component, Input } from '@angular/core';

interface EquipmentItem {
  name: string;
  description: string;
}

@Component({
  selector: 'app-equipment',
  imports: [],
  templateUrl: './equipment.html',
  styleUrl: './equipment.scss',
})
export class Equipment {
   @Input() equipment: EquipmentItem[] = [];
}
