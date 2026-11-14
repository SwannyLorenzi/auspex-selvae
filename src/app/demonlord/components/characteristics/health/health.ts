import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { CharacterService } from '../../../services/character.service';

export interface HealthData {
  maxHealth: number; // Santé - max health points
  currentDamage: number; // Dégâts - current damage (0 to maxHealth)
  healRate: number; // Vitesse de guérison - natural heal rate
}

@Component({
  selector: 'app-health',
  imports: [],
  templateUrl: './health.html',
  styleUrl: './health.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthComponent {
  health = input.required<HealthData>();
  characterId = input.required<string>();

  protected readonly isDanger = computed(
    () => this.health().currentDamage >= this.health().maxHealth
  );

  private readonly characterService = inject(CharacterService);

  protected openDialog(mode: 'plus' | 'minus'): void {
    const health = this.health();
    const maxAdd = health.maxHealth - health.currentDamage;
    const maxRemove = health.currentDamage;
    const hint = String(
      mode === 'minus' ? Math.min(10, maxRemove) : Math.min(10, maxAdd)
    );

    const result = prompt(
      mode === 'plus'
        ? `Ajouter des dégâts (0-${maxAdd})`
        : `Retirer des dégâts (0-${maxRemove})`,
      hint
    );

    if (result === null) return; // Cancelled

    const value = parseInt(result, 10);
    if (isNaN(value) || value <= 0) return;

    if (mode === 'plus') {
      const clamped = Math.min(value, maxAdd);
      const newDamage = health.currentDamage + clamped;
      this.characterService.updateDerivedAttribute(
        this.characterId(),
        'Dégâts',
        newDamage
      );
    } else {
      const clamped = Math.min(value, maxRemove);
      const newDamage = health.currentDamage - clamped;
      this.characterService.updateDerivedAttribute(
        this.characterId(),
        'Dégâts',
        newDamage
      );
    }
  }
}
