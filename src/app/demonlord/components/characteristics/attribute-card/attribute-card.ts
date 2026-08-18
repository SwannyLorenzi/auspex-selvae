import { Component, input } from '@angular/core';
import { Attribute } from '../characteristics-models';

@Component({
  selector: 'app-attribute-card',
  imports: [],
  templateUrl: './attribute-card.html',
  styleUrl: './attribute-card.scss',
})
export class AttributeCardComponent {
  attribute = input.required<Attribute>();
}
