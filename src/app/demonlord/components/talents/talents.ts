import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { type Talent } from '../../demonlord-models';

@Component({
  selector: 'app-talents',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './talents.html',
  styleUrl: './talents.scss',
})
export class TalentsComponent {
  talents = input.required<Talent[]>();

  protected toggleExpanded = (talentName: string): void => {
    const expanded = this._expanded();
    const next = expanded === talentName ? '' : talentName;
    this._expanded.set(next);
  };

  private _expanded = signal('');
  readonly expanded = this._expanded;
}
