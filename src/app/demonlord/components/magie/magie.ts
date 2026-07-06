import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MagicTradition, Spell } from '../../demonlord-models';
import { SpellCardComponent } from '../spell-card/spell-card';

@Component({
  selector: 'app-magie',
  imports: [SpellCardComponent],
  templateUrl: './magie.html',
  styleUrl: './magie.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MagieComponent {
  traditions = input.required<MagicTradition[]>();

  resetAllUses(): void {
    for (const tradition of this.traditions()) {
      for (const spell of tradition.spells) {
        spell.currentUses = 0;
      }
    }
  }
}
