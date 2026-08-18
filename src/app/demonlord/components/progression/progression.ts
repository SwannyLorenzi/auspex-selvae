import { Component, input } from '@angular/core';
import { Progression } from './progression-models';

@Component({
  selector: 'app-progression',
  imports: [],
  templateUrl: './progression.html',
  styleUrl: './progression.scss',
})
export class ProgressionComponent {
  progression = input.required<Progression>();
}
