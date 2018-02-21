import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyComponent } from './verify/verify.component';

import { AuthGuard } from './auth.guard';

import { AuthenticationService, NewsService, MarketService, UserService } from './services/index';
import { MarketComponent } from './market/market.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    VerifyComponent,
    LeaderboardComponent
    MarketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    HttpClientModule,
    AuthenticationService,
    NewsService,
    UserService,
    MarketService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
