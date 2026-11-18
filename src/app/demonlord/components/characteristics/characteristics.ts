import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { Attribute, DerivedAttribute, CharacteristicVertex } from './characteristics-models';
import { CharacterService } from '../../services/character.service';

const MAIN_NAMES = new Set(['Force', 'Intellect', 'Agilité', 'Volonté', 'Santé']);

/** Maps main vertex name to its expected derived attribute name */
const SECONDARY_LOOKUP: Record<string, string> = {
  Force: 'Taille/Gabarit',
  Intellect: 'Perception',
  Agilité: 'Vitesse',
  Volonté: 'Folie',
  Santé: 'Vitesse de guérison',
};

/** Short display name for secondary attributes */
const SECONDARY_DISPLAY: Record<string, string> = {
  'Taille/Gabarit': 'Gabarit',
  'Vitesse de guérison': 'Guérison',
};

@Component({
  selector: 'app-characteristics',
  imports: [],
  templateUrl: './characteristics.html',
  styleUrl: './characteristics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacteristicsComponent {
  mainAttributes = input.required<Attribute[]>();
  derivedAttributes = input.required<DerivedAttribute[]>();
  characterId = input.required<string>();

  readonly characterService = inject(CharacterService);

  protected readonly vertices = computed<CharacteristicVertex[]>(() => {
    const mainAttrs = this.mainAttributes();
    const derivedAttrs = this.derivedAttributes();
    const derivedMap = new Map<string, DerivedAttribute>();
    for (const attr of derivedAttrs) {
      derivedMap.set(attr.name, attr);
    }

    // Build a map of main attrs by name
    const mainMap = new Map<string, Attribute>();
    for (const attr of mainAttrs) {
      mainMap.set(attr.name, attr);
    }

    // Vertex order matching the pentagram geometry
    const vertexOrder: Array<keyof typeof SECONDARY_LOOKUP> = ['Force', 'Intellect', 'Agilité', 'Volonté', 'Santé'];
    const result: CharacteristicVertex[] = [];

    for (const name of vertexOrder) {
      const mainAttr = mainMap.get(name);
      if (!mainAttr) continue;

      const vertex: CharacteristicVertex = {
        name: mainAttr.name,
        value: mainAttr.value,
        bonus: mainAttr.bonus,
      };

      // Find the secondary attribute
      const secondaryName = SECONDARY_LOOKUP[name];
      if (secondaryName) {
        const secondaryAttr = derivedMap.get(secondaryName) ?? mainAttrs.find(a => a.name === secondaryName);
        if (secondaryAttr) {
          vertex.secondary = {
            name: SECONDARY_DISPLAY[secondaryName] ?? secondaryName,
            value: secondaryAttr.value,
            bonus: (secondaryAttr as Attribute).bonus,
          };
        }
      }

      result.push(vertex);
    }

    return result;
  });

  protected readonly damageValue = computed<number>(() => {
    const derived = this.derivedAttributes();
    const damage = derived.find(a => a.name === 'Dégâts');
    return damage?.value ?? 0;
  });

  protected readonly isKO = computed<boolean>(() => {
    const vertices = this.vertices();
    const healthVertex = vertices.find(v => v.name === 'Santé');
    if (!healthVertex) return false;
    return this.damageValue() >= healthVertex.value;
  });
}
