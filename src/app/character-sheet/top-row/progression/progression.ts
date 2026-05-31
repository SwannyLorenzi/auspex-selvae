import { Component, Input } from '@angular/core';

interface ProgressionData {
  level: number;
  ancestry: string;
  apprentice: string;
  expert: string;
  master: string;
}

@Component({
  selector: 'app-progression',
  imports: [],
  templateUrl: './progression.html',
  styleUrl: './progression.scss',
})
export class Progression {
   @Input() progression!: ProgressionData;
}
