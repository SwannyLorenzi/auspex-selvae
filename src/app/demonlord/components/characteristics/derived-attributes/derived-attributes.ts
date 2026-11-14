import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { DerivedAttribute } from '../characteristics-models';
import { AttributeCardComponent } from '../attribute-card/attribute-card';

@Component({
  selector: 'app-derived-attributes',
  imports: [AttributeCardComponent],
  templateUrl: './derived-attributes.html',
  styleUrl: './derived-attributes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DerivedAttributesComponent {
  attributes = input.required<DerivedAttribute[]>();
}
