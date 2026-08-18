import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { characterData } from './demonlord-data';
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
  protected readonly character = characterData;
}
