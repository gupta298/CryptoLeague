 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { HomeComponent }   from './home/home.component';
import { LandingComponent }   from './landing/landing.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { VerifyComponent }   from './verify/verify.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component'
import { MarketComponent }   from './market/market.component';
import { SettingsComponent } from './settings/settings.component';
import { LeagueSelectComponent } from './league-select/league-select.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'verify', component: VerifyComponent},
	{ path: 'landing', component: LandingComponent, canActivate: [AuthGuard] },
	{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
	{ path: 'market', component: MarketComponent, canActivate: [AuthGuard] },
	{ path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
	{ path: 'league', component: LeagueDetailComponent, canActivate: [AuthGuard] },
	{ path: 'league/:id', component: LeagueDetailComponent, canActivate: [AuthGuard] },
	{ path: 'join', component: LeagueSelectComponent, canActivate: [AuthGuard]},
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule { }
