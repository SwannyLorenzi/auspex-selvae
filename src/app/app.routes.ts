import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { DemonlordComponent } from './demonlord/demonlord';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'demonlord', redirectTo: 'demonlord/77', pathMatch: 'full' },
  { path: 'demonlord/:characterId', component: DemonlordComponent },
  { path: '**', redirectTo: 'home' },
];
