import { Component, input } from '@angular/core';
import { Magic } from '../../demonlord-models';
import { SpellCardComponent } from '../spell-card/spell-card';

@Component({
  selector: 'app-magie',
  imports: [SpellCardComponent],
  templateUrl: './magie.html',
  styleUrl: './magie.scss',
})
export class MagieComponent {
  magic = input.required<Magic>();

  resetAllUses(): void {
    for (const spell of this.magic().spells) {
      spell.currentUses = 0;
    }
  }
}
