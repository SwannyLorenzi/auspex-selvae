import { Routes } from '@angular/router';
import { CharacterSheet } from './character-sheet/character-sheet';

export const routes: Routes = [
   { path: '', component: CharacterSheet },
   { path: '**', redirectTo: '', pathMatch: 'full' },
];
