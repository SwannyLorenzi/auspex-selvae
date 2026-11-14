import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Character } from '../../demonlord-models';

@Component({
  selector: 'app-character',
  imports: [],
  templateUrl: './character.html',
  styleUrl: './character.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterComponent {
  character = input.required<Character | null>();
}
