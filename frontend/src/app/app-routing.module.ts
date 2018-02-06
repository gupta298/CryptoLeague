import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }   from './home/home.component';
import { LandingComponent }   from './landing/landing.component';


const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'landing', component: LandingComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
