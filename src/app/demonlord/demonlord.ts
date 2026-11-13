import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CharacterService } from './services/character.service';
import { CharacterComponent } from './components/character/character';
import { ProgressionComponent } from './components/progression/progression';
import { ProfessionsComponent } from './components/professions/professions';
import { CharacteristicsComponent } from './components/characteristics/characteristics';
import { TalentsComponent } from './components/talents/talents';
import { MagicComponent } from './components/magic/magic';
import { MasterBrewerComponent } from './components/master-brewer/master-brewer';
import { EquipmentComponent } from './components/equipment/equipment';

@Component({
  selector: 'app-demonlord',
  imports: [
    RouterLink,
    CharacterComponent,
    ProgressionComponent,
    ProfessionsComponent,
    CharacteristicsComponent,
    TalentsComponent,
    MagicComponent,
    MasterBrewerComponent,
    EquipmentComponent,
  ],
  templateUrl: './demonlord.html',
  styleUrl: './demonlord.scss',
})
export class DemonlordComponent {
  private route = inject(ActivatedRoute);
  private characterService = inject(CharacterService);

  protected readonly characterId = computed(() =>
    this.route.snapshot.paramMap.get('characterId') ?? ''
  );

  protected readonly character = this.characterService.getCharacter(
    this.characterId()
  );
}
