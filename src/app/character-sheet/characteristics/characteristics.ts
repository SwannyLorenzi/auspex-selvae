import { Component, Input } from '@angular/core';

interface Attribute {
  name: string;
  value: number;
  modifier: number;
  advantages: number;
}

interface DerivedStat {
  name: string;
  value: number | string;
  formula: string;
}

@Component({
  selector: 'app-characteristics',
  imports: [],
  templateUrl: './characteristics.html',
  styleUrl: './characteristics.scss',
})
export class Characteristics {
  @Input() attributes: Attribute[] = [];
  @Input() derivedStats: DerivedStat[] = [];

  getModifierText(modifier: number): string {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }

  getAdvantageText(count: number): string {
    if (count <= 0) return '';
    return `+${count} avantage${count > 1 ? 's' : ''}`;
  }
}
