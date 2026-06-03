import { Component, Input } from '@angular/core';
import { Equipment } from '../../demonlord-data';

@Component({
  selector: 'app-equipement',
  imports: [],
  templateUrl: './equipement.html',
  styleUrl: './equipement.scss',
})
export class EquipementComponent {
  @Input() currency: string = '';
  @Input() equipment: Equipment[] = [];
}
