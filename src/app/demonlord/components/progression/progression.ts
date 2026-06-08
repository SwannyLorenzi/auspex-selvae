import { Component, Input } from '@angular/core';
import { Progression } from '../../demonlord-models';

@Component({
  selector: 'app-progression',
  imports: [],
  templateUrl: './progression.html',
  styleUrl: './progression.scss',
})
export class ProgressionComponent {
  @Input() progression: Progression = {} as Progression;
}
