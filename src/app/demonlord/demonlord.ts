import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterService } from './services/character.service';
import { CharacterComponent } from './components/character/character';
import { ProgressionComponent } from './components/progression/progression';
import { ProfessionsComponent } from './components/professions/professions';
import { CharacteristicsComponent } from './components/characteristics/characteristics';
import { AfflictionsComponent } from './components/afflictions/afflictions';
import { TalentsComponent } from './components/talents/talents';
import { MagicComponent } from './components/magic/magic';
import { MasterBrewerComponent } from './components/master-brewer/master-brewer';
import { EquipmentComponent } from './components/equipment/equipment';
import { MoneyComponent } from './components/money/money';
import { LucideArrowLeft, LucideRotateCcw } from '@lucide/angular';

@Component({
  selector: 'app-demonlord',
  imports: [
    RouterLink,
    CharacterComponent,
    ProgressionComponent,
    ProfessionsComponent,
    CharacteristicsComponent,
    AfflictionsComponent,
    TalentsComponent,
    MagicComponent,
    MasterBrewerComponent,
    EquipmentComponent,
    MoneyComponent,
    LucideArrowLeft,
    LucideRotateCcw,
  ],
  templateUrl: './demonlord.html',
  styleUrl: './demonlord.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemonlordComponent {
  private route = inject(ActivatedRoute);
  readonly characterService = inject(CharacterService);

  protected readonly characterId = computed(() =>
    this.route.snapshot.paramMap.get('characterId') ?? ''
  );

  protected readonly character = this.characterService.getCharacter(
    this.characterId()
  );

  /**
   * Confirm and reset the character's dynamic state from localStorage.
   */
  protected confirmReset(): void {
    if (
      confirm(
        `Réinitialiser l'état de ${this.character()!.name} ? Toutes les valeurs seront restaurées à leurs défauts.`
      )
    ) {
      this.characterService.resetCharacter(this.characterId());
    }
  }
}
