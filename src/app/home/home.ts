import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CharacterSheet {
  name: string;
  path: string;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  protected readonly title = signal('auspex-selvae');
  protected readonly characters: CharacterSheet[] = [
     { name: '7 7', path: '/demonlord', description: 'La Tavernière' },
   ];
}
