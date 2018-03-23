import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LeagueDetailComponent } from './league-detail.component';
import { LeagueWaitingOverlayComponent } from '../league-waiting-overlay/league-waiting-overlay.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { AuthenticationService, MarketService, LeagueService, PortfolioService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub'

describe('LeagueDetailComponent', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],      
      declarations: [ LeagueDetailComponent, LeagueWaitingOverlayComponent, PortfolioComponent, SidebarComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, LeagueService, PortfolioService, MarketService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
