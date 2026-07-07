import { Component, input } from '@angular/core';
import { Magic } from '../../demonlord-models';
import { SpellCardComponent } from './spell-card/spell-card';

@Component({
  selector: 'app-magic',
  imports: [SpellCardComponent],
  templateUrl: './magic.html',
  styleUrl: './magic.scss',
})
export class MagicComponent {
  magic = input.required<Magic>();

  resetAllUses(): void {
    for (const spell of this.magic().spells) {
      spell.currentUses = 0;
    }
  }
}
