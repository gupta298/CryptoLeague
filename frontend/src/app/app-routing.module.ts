import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { HomeComponent }   from './home/home.component';
import { LandingComponent }   from './landing/landing.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { VerifyComponent }   from './verify/verify.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component'
import { MarketComponent }   from './market/market.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'landing', component: LandingComponent },
	{ path: 'verify', component: VerifyComponent},
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'leaderboard', component: LeaderboardComponent},
	{ path: 'market', component: MarketComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
