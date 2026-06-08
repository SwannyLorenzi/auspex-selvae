import { Component, Input } from '@angular/core';
import { Attribute, DerivedAttribute } from '../../demonlord-models';
import { AttributeCardComponent } from '../attribute-card/attribute-card';
import { DerivedAttributesComponent } from '../derived-attributes/derived-attributes';

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
