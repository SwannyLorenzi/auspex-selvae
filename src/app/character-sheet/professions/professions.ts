import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-professions',
  imports: [],
  templateUrl: './professions.html',
  styleUrl: './professions.scss',
})
export class Professions {
   @Input() professions: string[] = [];
}
