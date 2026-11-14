import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Profession } from './professions-models';

@Component({
  selector: 'app-professions',
  imports: [],
  templateUrl: './professions.html',
  styleUrl: './professions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionsComponent {
  professions = input.required<Profession[]>();
}
