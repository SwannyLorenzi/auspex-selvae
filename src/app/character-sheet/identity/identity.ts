import { Component, Input } from '@angular/core';

interface Character {
  name: string;
  nickname?: string;
  playerName: string;
  description: string;
}

@Component({
  selector: 'app-identity',
  imports: [],
  templateUrl: './identity.html',
  styleUrl: './identity.scss',
})
export class Identity {
   @Input() character!: Character;
}
