import { Component, input } from '@angular/core';
import { Character } from '../../demonlord-models';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.html',
  styleUrl: './character.scss',
})
export class CharacterComponent {
  character = input.required<Character>();
}
