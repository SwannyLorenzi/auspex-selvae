import { Component, input, output, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Spell } from '../magic-models';
import { getMaxUses } from '../references/max-uses';

@Component({
  selector: 'app-spell-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './spell-card.html',
  styleUrl: './spell-card.scss',
})
export class SpellCardComponent {
  spell = input.required<Spell>();
  power = input.required<number>();
  spend = output<void>();

  private _expanded = signal(false);
  isExpanded = this._expanded;

  maxUses = computed(() => getMaxUses(this.power(), this.spell().level));

  toggleExpanded(): void {
    this._expanded.update(v => !v);
  }

  spendUse(): void {
    if (this.spell().currentUses < this.maxUses()) {
      this.spend.emit();
    }
  }
}
