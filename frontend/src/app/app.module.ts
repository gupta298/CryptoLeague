import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyComponent } from './verify/verify.component';

import { AuthGuard } from './auth.guard';

import { AuthenticationService, NewsService, UserService } from './services/index';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    AuthenticationService,
    NewsService,
    AuthGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
