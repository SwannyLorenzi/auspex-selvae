import { Component, input, output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ALL_AFFLICTIONS } from '../../afflictions';

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
  onToggle = output<string[]>();

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
    this.onToggle.emit(next);
  }
}
