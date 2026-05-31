import { Component, Input } from '@angular/core';

interface Talent {
  name: string;
  description?: string;
}

@Component({
  selector: 'app-talents',
  imports: [],
  templateUrl: './talents.html',
  styleUrl: './talents.scss',
})
export class Talents {
  @Input() talents: Talent[] = [];
}
