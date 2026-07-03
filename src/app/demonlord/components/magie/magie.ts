import { Component, Input } from '@angular/core';
import { MagicTradition } from '../../demonlord-models';
import { SpellCardComponent } from '../spell-card/spell-card';

@Component({
  selector: 'app-magie',
  imports: [SpellCardComponent],
  templateUrl: './magie.html',
  styleUrl: './magie.scss',
})
export class MagieComponent {
  @Input() traditions: MagicTradition[] = [];
}
