import { Component, input } from '@angular/core';
import { Spell } from '../../demonlord-models';
import { SpellCardComponent } from '../spell-card/spell-card';

@Component({
  selector: 'app-magie',
  imports: [SpellCardComponent],
  templateUrl: './magie.html',
  styleUrl: './magie.scss',
})
export class MagieComponent {
  spells = input.required<Spell[]>();

  resetAllUses(): void {
    for (const spell of this.spells()) {
      spell.currentUses = 0;
    }
  }
}
