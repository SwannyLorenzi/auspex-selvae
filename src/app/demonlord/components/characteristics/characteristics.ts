import { Component, input } from '@angular/core';
import { Attribute, DerivedAttribute } from './characteristics-models';
import { AttributeCardComponent } from './attribute-card/attribute-card';
import { DerivedAttributesComponent } from './derived-attributes/derived-attributes';

@Component({
  selector: 'app-characteristics',
  imports: [AttributeCardComponent, DerivedAttributesComponent],
  templateUrl: './characteristics.html',
  styleUrl: './characteristics.scss',
})
export class CharacteristicsComponent {
  mainAttributes = input.required<Attribute[]>();
  derivedAttributes = input.required<DerivedAttribute[]>();
}
