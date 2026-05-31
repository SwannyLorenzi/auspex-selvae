import { Component, Input } from '@angular/core';

interface Character {
  name: string;
  nickname?: string;
  playerName: string;
  description: string;
}

interface Progression {
  level: number;
  ancestry: string;
  apprentice: string;
  expert: string;
  master: string;
}

@Component({
  selector: 'app-top-row',
  imports: [],
  templateUrl: './top-row.html',
  styleUrl: './top-row.scss',
})
export class TopRow {
  @Input() character!: Character;
  @Input() progression!: Progression;
  @Input() professions: string[] = [];
}
