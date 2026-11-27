import { Component, input, output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ALL_AFFLICTIONS } from '../../afflictions';
import { IMMUNITY_EMOJI } from '../talents/immunity-emoji';

/** Normalize a string: lowercase, strip accents, trim */
function norm(str: string): string {
  return str.toLowerCase().trim().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/**
 * Map from normalized immunity strings (as stored in character data)
 * to the corresponding affliction key.
 */
const IMMUNITY_MAP: Record<string, string> = {
  'maladies': 'malade',
  'malade': 'malade',
  'poison': 'empoisonne',
  'empoisonne': 'empoisonne',
  'empoisonné': 'empoisonne',
  'endormi': 'endormi',
  'fatigue': 'fatigue',
  'fatigué': 'fatigue',
  'immobilise': 'immobilise',
  'immobilisé': 'immobilise',
  'ralenti': 'ralenti',
  // 'degats du froid' has no corresponding affliction in our list
};

/**
 * Map immunity strings to their damage type display name.
 * Only includes immunities that are damage-related.
 */
const DAMAGE_IMMUNITY_LABELS: Record<string, string> = {
  'maladies': 'Dégâts des maladies',
  'maladie': 'Dégâts des maladies',
  'poison': 'Dégâts de poison',
  'empoisonné': 'Dégâts de poison',
  'empoisonne': 'Dégâts de poison',
  'degats du froid': 'Dégâts du froid',
  'dégats du froid': 'Dégâts du froid',
};

export interface DamageImmunity {
  emoji: string;
  label: string;
}

@Component({
  selector: 'app-afflictions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './afflictions.html',
  styleUrl: './afflictions.scss',
})
export class AfflictionsComponent {
  /** List of immunity strings from character data */
  immunities = input.required<string[]>();

  /** List of currently active affliction keys */
  activeKeys = input<string[]>([]);

  /** Emit when afflictions are toggled */
  toggled = output<string[]>();

  protected readonly afflictions = ALL_AFFLICTIONS;

  /** Check if a key is immune (disabled) */
  protected isImmune(key: string): boolean {
    return this.immunities().some((imm) => {
      const normalized = norm(imm);
      const expectedKey = IMMUNITY_MAP[normalized] ?? normalized;
      return expectedKey === key;
    });
  }

  /** Toggle a specific affliction on/off */
  protected toggle(key: string): void {
    const current = this.activeKeys() ?? [];
    const exists = current.includes(key);
    const next = exists
      ? current.filter((k) => k !== key)
      : [...current, key];
    this.toggled.emit(next);
  }

  /** Get the display labels for damage-related immunities */
  protected damageImmunities(): DamageImmunity[] {
    const seen = new Set<string>();
    const labels: DamageImmunity[] = [];

    for (const imm of this.immunities()) {
      const normalized = norm(imm);
      const label = DAMAGE_IMMUNITY_LABELS[normalized];
      if (label && !seen.has(label)) {
        seen.add(label);
        const emoji = IMMUNITY_EMOJI[normalized] ?? '🛡️';
        labels.push({ emoji, label });
      }
    }

    return labels;
  }
}
