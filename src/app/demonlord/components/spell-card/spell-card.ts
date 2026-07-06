import { Component, input, signal } from '@angular/core';
import { Spell } from '../../demonlord-models';

@Component({
  selector: 'app-spell-card',
  standalone: true,
  imports: [],
  templateUrl: './spell-card.html',
  styleUrl: './spell-card.scss',
})
export class SpellCardComponent {
  spell = input.required<Spell>();
  private _expanded = signal(false);
  isExpanded = this._expanded;

  toggleExpanded(): void {
    this._expanded.update(v => !v);
  }

  spendUse(): void {
    const spell = this.spell();
    if (spell.currentUses < spell.maxUses) {
      spell.currentUses++;
    }
  }
}
