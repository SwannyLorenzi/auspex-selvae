import { Component, Input } from '@angular/core';
import { Attribute } from '../../demonlord-data';
import { AttributeCardComponent } from '../attribute-card/attribute-card';
import { DerivedAttributesComponent, DerivedAttribute } from '../derived-attributes/derived-attributes';

@Component({
  selector: 'app-caracteristiques',
  imports: [AttributeCardComponent, DerivedAttributesComponent],
  templateUrl: './caracteristiques.html',
  styleUrl: './caracteristiques.scss',
})
export class CaracteristiquesComponent {
  @Input() mainAttributes: Attribute[] = [];
  @Input() derivedAttributes: DerivedAttribute[] = [];
}
