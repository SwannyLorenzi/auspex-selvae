import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DefenseData } from './defense-models';

export type { DefenseData };

@Component({
  selector: 'app-defense',
  imports: [],
  templateUrl: './defense.html',
  styleUrl: './defense.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefenseComponent {
  defense = input.required<DefenseData>();
}
