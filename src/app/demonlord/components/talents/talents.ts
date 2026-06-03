import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-talents',
  imports: [],
  templateUrl: './talents.html',
  styleUrl: './talents.scss',
})
export class TalentsComponent {
  @Input() immunities: string[] = [];
  @Input() talents: string[] = [];
}
