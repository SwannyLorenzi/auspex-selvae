import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { Magic } from './magic-models';
import { SpellCardComponent } from './spell-card/spell-card';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-magic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SpellCardComponent],
  templateUrl: './magic.html',
  styleUrl: './magic.scss',
})
export class MagicComponent {
  magic = input.required<Magic>();
  characterId = input.required<string>();

  private characterService = inject(CharacterService);

  resetAllUses(): void {
    this.characterService.resetSpellUses(this.characterId());
  }

  handleSpend(spellName: string): void {
    this.characterService.spellUse(this.characterId(), spellName);
  }
}
