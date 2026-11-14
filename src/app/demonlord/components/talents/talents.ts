import { Component, input } from '@angular/core';
import { immunityEmoji } from './immunity-emoji';

export const immunityData = (name: string) => ({
  emoji: immunityEmoji(name),
  label: name.charAt(0).toUpperCase() + name.slice(1),
});

@Component({
  selector: 'app-talents',
  imports: [],
  templateUrl: './talents.html',
  styleUrl: './talents.scss',
})
export class TalentsComponent {
  immunities = input.required<string[]>();
  talents = input.required<string[]>();

  protected immunity = immunityData;
}
