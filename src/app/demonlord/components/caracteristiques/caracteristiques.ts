import { Component, Input } from '@angular/core';
import { Attribute, DerivedAttribute } from '../../demonlord-data';

@Component({
  selector: 'app-caracteristiques',
  imports: [],
  templateUrl: './caracteristiques.html',
  styleUrl: './caracteristiques.scss',
})
export class CaracteristiquesComponent {
  @Input() mainAttributes: Attribute[] = [];
  @Input() derivedAttributes: DerivedAttribute[] = [];
}
