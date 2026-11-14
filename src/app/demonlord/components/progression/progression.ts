import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Progression } from './progression-models';

@Component({
  selector: 'app-progression',
  imports: [],
  templateUrl: './progression.html',
  styleUrl: './progression.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressionComponent {
  progression = input.required<Progression>();
}
