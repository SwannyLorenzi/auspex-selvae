import { Component, input } from '@angular/core';

@Component({
  selector: 'app-talents',
  imports: [],
  templateUrl: './talents.html',
  styleUrl: './talents.scss',
})
export class TalentsComponent {
  immunities = input.required<string[]>();
  talents = input.required<string[]>();
}
