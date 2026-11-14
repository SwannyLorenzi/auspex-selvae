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
    const charSignal = this.characterService.getCharacter(this.characterId());
    charSignal.update((char) => {
      if (!char) return char;
      return {
        ...char,
        magic: { ...char.magic, spells: char.magic.spells.map(s => ({ ...s, currentUses: 0 })) },
      };
    });
  }

  handleSpend(spellName: string): void {
    const charSignal = this.characterService.getCharacter(this.characterId());
    charSignal.update((char) => {
      if (!char) return char;
      return {
        ...char,
        magic: {
          ...char.magic,
          spells: char.magic.spells.map(s =>
            s.name === spellName ? { ...s, currentUses: s.currentUses + 1 } : s
          ),
        },
      };
    });
  }
}
