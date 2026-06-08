import { Component, Input } from '@angular/core';
import { Attribute, DerivedAttribute } from '../../demonlord-data';
import { AttributeCardComponent } from '../attribute-card/attribute-card';

@Component({
  selector: 'app-caracteristiques',
  imports: [AttributeCardComponent],
  templateUrl: './caracteristiques.html',
  styleUrl: './caracteristiques.scss',
})
export class CaracteristiquesComponent {
  @Input() mainAttributes: Attribute[] = [];
  @Input() derivedAttributes: DerivedAttribute[] = [];
}
