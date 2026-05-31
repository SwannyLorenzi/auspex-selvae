import { Component, Input } from '@angular/core';
import { Identity } from './identity/identity';
import { Progression } from './progression/progression';
import { Professions } from './professions/professions';

interface Character {
  name: string;
  nickname?: string;
  playerName: string;
  description: string;
}

interface ProgressionData {
  level: number;
  ancestry: string;
  apprentice: string;
  expert: string;
  master: string;
}

@Component({
  selector: 'app-top-row',
  imports: [Identity, Progression, Professions],
  templateUrl: './top-row.html',
  styleUrl: './top-row.scss',
})
export class TopRow {
   @Input() character!: Character;
   @Input() progression!: ProgressionData;
   @Input() professions: string[] = [];
}
