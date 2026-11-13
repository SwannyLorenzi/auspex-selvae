import { Component, input, computed } from '@angular/core';
import { Attribute, DerivedAttribute } from './characteristics-models';
import { AttributeCardComponent } from './attribute-card/attribute-card';
import { DerivedAttributesComponent } from './derived-attributes/derived-attributes';
import { HealthComponent } from './health/health';
import { DefenseComponent } from './defense/defense';
import { DefenseData } from './defense/defense-models';

const HEALTH_ATTRIBUTE_NAMES = new Set([
  'Santé',
  'Dégâts',
  'Vitesse de guérison',
]);

@Component({
  selector: 'app-characteristics',
  imports: [AttributeCardComponent, DerivedAttributesComponent, HealthComponent, DefenseComponent],
  templateUrl: './characteristics.html',
  styleUrl: './characteristics.scss',
})
export class CharacteristicsComponent {
  mainAttributes = input.required<Attribute[]>();
  derivedAttributes = input.required<DerivedAttribute[]>();
  characterId = input.required<string>();
  defense = input<DefenseData | null>(null);

  protected readonly healthData = computed(() => {
    const attrs = this.derivedAttributes();
    const healthAttr = attrs.find((a) => a.name === 'Santé');
    const damageAttr = attrs.find((a) => a.name === 'Dégâts');
    const healRateAttr = attrs.find((a) => a.name === 'Vitesse de guérison');

    if (!healthAttr || !damageAttr || !healRateAttr) return null;

    return {
      maxHealth: healthAttr.value,
      currentDamage: damageAttr.value,
      healRate: healRateAttr.value,
    };
  });

  protected readonly nonHealthDerivedAttributes = computed(() =>
    this.derivedAttributes().filter(
      (attr) => !HEALTH_ATTRIBUTE_NAMES.has(attr.name)
    )
  );
}
