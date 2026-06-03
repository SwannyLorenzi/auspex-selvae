import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { DemonlordComponent } from './demonlord/demonlord';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'demonlord', component: DemonlordComponent },
	{ path: '**', redirectTo: 'home' },
];
