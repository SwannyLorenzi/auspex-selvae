import { Component, input } from '@angular/core';
import { DefenseData } from './defense-models';

export type { DefenseData };

@Component({
  selector: 'app-defense',
  imports: [],
  templateUrl: './defense.html',
  styleUrl: './defense.scss',
})
export class DefenseComponent {
  defense = input.required<DefenseData>();
}
