import { Component, Input } from '@angular/core';
import { Profession } from '../../demonlord-data';

@Component({
  selector: 'app-professions',
  imports: [],
  templateUrl: './professions.html',
  styleUrl: './professions.scss',
})
export class ProfessionsComponent {
  @Input() professions: Profession[] = [];
}
