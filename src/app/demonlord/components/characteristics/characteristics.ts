import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { CharacterData } from './characteristics-models';
import { CharacterService } from '../../services/character.service';

const CORE_STATS = ['force', 'intellect', 'agility', 'willpower', 'perception'] as const;

/** Maps main vertex name to its secondary attribute key */
const SECONDARY_MAP: Record<string, string> = {
  force: 'size',
  intellect: 'perception',
  agility: 'speed',
  willpower: 'madness',
  health: 'healingRate',
};

/** Display names for secondary attributes */
const SECONDARY_DISPLAY: Record<string, string> = {
  size: 'Gabarit',
  healingRate: 'Guérison',
};

/** Display names for attribute keys */
const DISPLAY_NAMES: Record<string, string> = {
  force: 'Force',
  intellect: 'Intellect',
  agility: 'Agilité',
  willpower: 'Volonté',
  perception: 'Perception',
  health: 'Santé',
  speed: 'Vitesse',
  size: 'Gabarit',
  spellpower: 'Puissance',
  healingRate: 'Guérison',
  defense: 'Défense',
  damage: 'Dégâts',
  madness: 'Folie',
  corruption: 'Corruption',
};

@Component({
  selector: 'app-characteristics',
  imports: [],
  templateUrl: './characteristics.html',
  styleUrl: './characteristics.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacteristicsComponent {
  data = input.required<CharacterData>();
  characterId = input.required<string>();

  readonly characterService = inject(CharacterService);

  protected readonly vertices = computed<CharacterVertex[]>(() => {
    const d = this.data();
    const vertexOrder = ['force', 'intellect', 'agility', 'willpower', 'health'] as const;
    const result: CharacterVertex[] = [];

    for (const key of vertexOrder) {
      const vertex: CharacterVertex = {
        name: DISPLAY_NAMES[key] ?? key,
        value: d[key],
        bonus: this.computeBonus(d[key]),
      };

      // Find the secondary attribute
      const secondaryKey = SECONDARY_MAP[key];
      if (secondaryKey) {
        const secValue = d[secondaryKey as keyof CharacterData] as number;
        if (secValue !== undefined) {
          vertex.secondary = {
            name: SECONDARY_DISPLAY[secondaryKey] ?? DISPLAY_NAMES[secondaryKey] ?? secondaryKey,
            value: secValue,
            bonus: this.computeBonus(secValue),
          };
        }
      }

      result.push(vertex);
    }

    return result;
  });

  protected readonly isKO = computed<boolean>(() => {
    const d = this.data();
    return d.damage >= d.health;
  });

  private computeBonus(value: number): string {
    const bonus = value - 10;
    return bonus >= 0 ? `+${bonus}` : `${bonus}`;
  }
}

interface CharacterVertex {
  name: string;
  value: number;
  bonus?: string;
  secondary?: {
    name: string;
    value: number;
    bonus?: string;
  };
}
