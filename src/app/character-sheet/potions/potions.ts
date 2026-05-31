import { Component, Input } from '@angular/core';

interface Potion {
  name: string;
  cost: string;
  effect: string;
}

@Component({
  selector: 'app-potions',
  imports: [],
  templateUrl: './potions.html',
  styleUrl: './potions.scss',
})
export class Potions {
   @Input() potions: Potion[] = [];
}
