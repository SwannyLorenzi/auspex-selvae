import { Component, Input } from '@angular/core';
import { Attribute } from '../../demonlord-data';

@Component({
  selector: 'app-attribute-card',
  standalone: true,
  imports: [],
  templateUrl: './attribute-card.html',
  styleUrl: './attribute-card.scss',
})
export class AttributeCardComponent {
  @Input() attribute!: Attribute;
}
