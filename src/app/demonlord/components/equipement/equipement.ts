import { Component, Input } from '@angular/core';
import { Equipment } from '../../demonlord-models';

@Component({
  selector: 'app-equipement',
  imports: [],
  templateUrl: './equipement.html',
  styleUrl: './equipement.scss',
})
export class EquipementComponent {
  @Input() currency = '';
  @Input() equipment: Equipment[] = [];
}
