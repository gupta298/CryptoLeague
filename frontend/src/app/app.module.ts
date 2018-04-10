import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyComponent } from './verify/verify.component';
import { MarketComponent } from './market/market.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

import { AuthGuard } from './auth.guard';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { AuthenticationService, NewsService, MarketService, UserService, LeagueService, PortfolioService, AlertService } from './services/index';
import { SettingsComponent } from './settings/settings.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';
import { LeagueWaitingOverlayComponent } from './league-waiting-overlay/league-waiting-overlay.component';
import { LeagueSelectComponent } from './league-select/league-select.component';
import { LeagueStatisticsComponent } from './league-statistics/league-statistics.component';
import { AlertComponent } from './alert/alert.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    VerifyComponent,
    LeaderboardComponent,
    MarketComponent,
    SettingsComponent,
    PortfolioComponent,
    LeagueDetailComponent,
    LeagueWaitingOverlayComponent,
    LeagueSelectComponent,
    LeagueStatisticsComponent,
    AlertComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
   // Ng2SearchPipeModule
  ],
  providers: [
    HttpClientModule,
    AuthenticationService,
    NewsService,
    UserService,
    MarketService,
    LeagueService,
    PortfolioService,
    AlertService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
