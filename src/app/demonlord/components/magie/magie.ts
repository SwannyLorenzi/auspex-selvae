import { Component, Input } from '@angular/core';
import { MagicTradition } from '../../demonlord-models';

@Component({
  selector: 'app-magie',
  imports: [],
  templateUrl: './magie.html',
  styleUrl: './magie.scss',
})
export class MagieComponent {
  @Input() traditions: MagicTradition[] = [];
}
