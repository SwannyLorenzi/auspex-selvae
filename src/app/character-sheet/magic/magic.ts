import { Component, Input } from '@angular/core';

interface Spell {
  name: string;
  level: number;
  uses: number;
}

interface SpellTradition {
  name: string;
  spells: Spell[];
}

@Component({
  selector: 'app-magic',
  imports: [],
  templateUrl: './magic.html',
  styleUrl: './magic.scss',
})
export class Magic {
  @Input() traditions: SpellTradition[] = [];
}
