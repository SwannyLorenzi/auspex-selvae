import { Component, Input } from '@angular/core';
import { Character } from '../../demonlord-data';

@Component({
  selector: 'app-personnage',
  imports: [],
  templateUrl: './personnage.html',
  styleUrl: './personnage.scss',
})
export class PersonnageComponent {
  @Input() character: Character = {} as Character;
}
