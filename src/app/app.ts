import { Component } from '@angular/core';
import { CharacterSheet } from './character-sheet/character-sheet';

@Component({
  selector: 'app-root',
  imports: [CharacterSheet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
