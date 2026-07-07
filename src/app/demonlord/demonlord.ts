import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { characterData } from './demonlord-data';
import { PersonnageComponent } from './components/personnage/personnage';
import { ProgressionComponent } from './components/progression/progression';
import { ProfessionsComponent } from './components/professions/professions';
import { CaracteristiquesComponent } from './components/caracteristiques/caracteristiques';
import { TalentsComponent } from './components/talents/talents';
import { MagicComponent } from './components/magic/magic';
import { GrandBrasseurComponent } from './components/grand-brasseur/grand-brasseur';
import { EquipementComponent } from './components/equipement/equipement';

@Component({
  selector: 'app-demonlord',
  imports: [
    RouterLink,
    PersonnageComponent,
    ProgressionComponent,
    ProfessionsComponent,
    CaracteristiquesComponent,
    TalentsComponent,
    MagicComponent,
    GrandBrasseurComponent,
    EquipementComponent,
  ],
  templateUrl: './demonlord.html',
  styleUrl: './demonlord.scss',
})
export class DemonlordComponent {
  protected readonly character = characterData;
}
