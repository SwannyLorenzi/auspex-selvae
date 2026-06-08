import { Component, Input } from '@angular/core';
import { DerivedAttribute } from '../../demonlord-models';
import { AttributeCardComponent } from '../attribute-card/attribute-card';

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
