import { Component, Input } from '@angular/core';
import { Potion } from '../../demonlord-models';

@Component({
  selector: 'app-grand-brasseur',
  imports: [],
  templateUrl: './grand-brasseur.html',
  styleUrl: './grand-brasseur.scss',
})
export class GrandBrasseurComponent {
  @Input() potions: Potion[] = [];
}
