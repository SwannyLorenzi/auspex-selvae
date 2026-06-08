import { Component, Input } from '@angular/core';
import { Character } from '../../demonlord-models';

@Component({
  selector: 'app-personnage',
  imports: [],
  templateUrl: './personnage.html',
  styleUrl: './personnage.scss',
})
export class PersonnageComponent {
  @Input() character: Character = {} as Character;
}
