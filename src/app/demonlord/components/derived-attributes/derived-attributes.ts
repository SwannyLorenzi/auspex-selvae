import { Component, Input } from '@angular/core';
import { AttributeCardComponent } from '../attribute-card/attribute-card';

export interface DerivedAttribute {
  name: string;
  value: string;
  bonus?: string;
}

@Component({
  selector: 'app-derived-attributes',
  standalone: true,
  imports: [AttributeCardComponent],
  templateUrl: './derived-attributes.html',
  styleUrl: './derived-attributes.scss',
})
export class DerivedAttributesComponent {
  @Input() attributes: DerivedAttribute[] = [];
}
