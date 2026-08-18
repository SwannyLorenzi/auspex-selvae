import { Component, input } from '@angular/core';
import { Potion } from './master-brewer-models';

@Component({
  selector: 'app-master-brewer',
  imports: [],
  templateUrl: './master-brewer.html',
  styleUrl: './master-brewer.scss',
})
export class MasterBrewerComponent {
  potions = input.required<Potion[]>();
}
