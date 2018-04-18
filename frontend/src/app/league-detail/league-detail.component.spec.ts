import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import * as moment from 'moment';
import { LeagueDetailComponent } from './league-detail.component';
import { LeagueWaitingOverlayComponent } from '../league-waiting-overlay/league-waiting-overlay.component';
import { LeagueStatisticsComponent } from '../league-statistics/league-statistics.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { League } from '../league'

import { AuthenticationService, MarketService, LeagueService, PortfolioService, UserService, AlertService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub'
import { UserServiceStub } from '../stubs/user.service.stub';
import { LeagueServiceStub } from '../stubs/league.service.stub';
import { PortfolioServiceStub } from '../stubs/portfolio.service.stub';
import { MarketServiceStub } from '../stubs/market.service.stub';

describe('LeagueDetailComponent', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],      
      declarations: [ LeagueDetailComponent, LeagueWaitingOverlayComponent, LeagueStatisticsComponent, PortfolioComponent, SidebarComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, LeagueService, PortfolioService, MarketService, { provide: UserService, useClass: UserServiceStub }, AlertService ]
    })
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('LeagueDetailComponent with waiting room', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],      
      declarations: [ LeagueDetailComponent, LeagueWaitingOverlayComponent, LeagueStatisticsComponent, PortfolioComponent, SidebarComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, LeagueService, PortfolioService, MarketService , { provide: UserService, useClass: UserServiceStub }, AlertService]
    })
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    let league = new League();
    league.league_id = 3;
    league.league_type = "Bronze League";
    league.status = 0;
    league.start_time = null;
    league.portfolio_ids = [{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab53484699da7da5c3f78b6"}];
    component.league = league;
    fixture.detectChanges();
  });

  it('should show leagueWaitingOverlay', () => {
    expect(fixture.nativeElement.querySelector('app-league-waiting-overlay')).not.toBe(null);  
  });

  it('should not show leagueDetail', () => {
    expect(fixture.nativeElement.querySelector('ng-template #leagueDetail')).toBe(null);  
  });
});

describe('LeagueDetailComponent with league locked but not started', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;
  let userService: UserService;
  let leagueService: LeagueService;
  let portfolioService: PortfolioService;
  let marketService: MarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],      
      declarations: [ LeagueDetailComponent, LeagueWaitingOverlayComponent, LeagueStatisticsComponent, PortfolioComponent, SidebarComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, { provide: LeagueService, useClass: LeagueServiceStub }, { provide: PortfolioService, useClass: PortfolioServiceStub }, { provide: MarketService, useClass: MarketServiceStub }, { provide: UserService, useClass: UserServiceStub }, AlertService ]
    })
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    leagueService = TestBed.get(LeagueService);
    portfolioService = TestBed.get(PortfolioService);
    marketService = TestBed.get(MarketService);
    let league = new League();
    league.league_id = 3;
    league.league_type = "Bronze League";
    league.status = 1;
    league.start_time = new Date("2018-03-24T18:34:23.060Z");
    league.portfolio_ids = [{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"username":"VarunG","tokens":999995,"profilePicture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500","user_id":"5aa892e06b538a01f7356e34","portfolio_id":null,"portfolio_value":null},{"username":"hellx2","tokens":45,"profilePicture":"https://lh4.googleusercontent.com/-5B13iSX9Pts/AAAAAAAAAAI/AAAAAAAABZg/lcuRofywpc4/photo.jpg?sz=500","user_id":"5aaaa9991674950ddd8a8352","portfolio_id":"5ab548ae699da7da5c3f78c1"}];
    component.league = league;
    component.timeRemaining = "23h 39m 23s";
    component.status = "starts.";
    jasmine.clock().install();
    const mockedDateAndTime = '2018-03-23 14:55:00';
    const today = moment(mockedDateAndTime).toDate();
    jasmine.clock().mockDate(today);
    fixture.detectChanges();
  });

  it('should show 10 users in the leaderboard', () => {
    expect(fixture.nativeElement.querySelectorAll('tr').length).toEqual(11);
  });

  it('should show accurate time remaining when the league hasn\'t started yet', () => {
    expect(fixture.nativeElement.querySelector('.progress-bar').innerText).toContain("The league has ended.");
  });

  it('should not show leagueWaitingOverlay', () => {
    expect(fixture.nativeElement.querySelector('app-league-waiting-overlay')).toBe(null);  
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });
});

describe('LeagueDetailComponent with league locked and started', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;
  let userService: UserService;
  let leagueService: LeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],      
      declarations: [ LeagueDetailComponent, LeagueWaitingOverlayComponent, LeagueStatisticsComponent, PortfolioComponent, SidebarComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, { provide: LeagueService, useClass: LeagueServiceStub }, PortfolioService, MarketService, { provide: UserService, useClass: UserServiceStub }, AlertService ]
    })
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    leagueService = TestBed.get(LeagueService);
    let league = new League();
    league.league_id = 3;
    league.league_type = "Bronze League";
    league.status = 1;
    league.start_time = new Date("2018-03-24T18:34:23.060Z");
    league.portfolio_ids = [{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"username":"VarunG","tokens":999995,"profilePicture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500","user_id":"5aa892e06b538a01f7356e34","portfolio_id":null,"portfolio_value":null},{"username":"hellx2","tokens":45,"profilePicture":"https://lh4.googleusercontent.com/-5B13iSX9Pts/AAAAAAAAAAI/AAAAAAAABZg/lcuRofywpc4/photo.jpg?sz=500","user_id":"5aaaa9991674950ddd8a8352","portfolio_id":"5ab548ae699da7da5c3f78c1"}];
    component.league = league;
    component.timeRemaining = "4d 23h 39m 23s";
    component.status = "ends.";
    jasmine.clock().install();
    const mockedDateAndTime = '2018-03-24 18:37:00';
    const today = moment(mockedDateAndTime).toDate();
    jasmine.clock().mockDate(today);
    fixture.detectChanges();
  });


  it('should show accurate time remaining when the league has started', () => {
    const mockedDateAndTime = '2018-03-24 18:37:00';
    const today = moment(mockedDateAndTime).toDate();
    jasmine.clock().mockDate(today);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.progress-bar').innerText).toContain("The league has ended.");
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });
});


describe('LeagueDetailComponent with league ended', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;
  let userService: UserService;
  let leagueService: LeagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],      
      declarations: [ LeagueDetailComponent, LeagueWaitingOverlayComponent, LeagueStatisticsComponent, PortfolioComponent, SidebarComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, { provide: LeagueService, useClass: LeagueServiceStub }, PortfolioService, MarketService, { provide: UserService, useClass: UserServiceStub }, AlertService ]
    })
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    leagueService = TestBed.get(LeagueService);
    let league = new League();
    league.league_id = 4;
    league.league_type = "Bronze League";
    league.status = 4;
    league.start_time = new Date("2018-03-24T18:34:23.060Z");
    league.portfolio_ids = [{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":null},{"username":"VarunG","tokens":999995,"profilePicture":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500","user_id":"5aa892e06b538a01f7356e34","portfolio_id":null,"portfolio_value":null},{"username":"hellx2","tokens":45,"profilePicture":"https://lh4.googleusercontent.com/-5B13iSX9Pts/AAAAAAAAAAI/AAAAAAAABZg/lcuRofywpc4/photo.jpg?sz=500","user_id":"5aaaa9991674950ddd8a8352","portfolio_id":"5ab548ae699da7da5c3f78c1"}];
    component.league = league;
    jasmine.clock().install();
    const mockedDateAndTime = '2018-03-25 14:55:00';
    const today = moment(mockedDateAndTime).toDate();
    jasmine.clock().mockDate(today);
    fixture.detectChanges();
  });


  it('should show the portfolios in the leaderboard', () => {
    const mockedDateAndTime = '2018-03-25 14:55:00';
    const today = moment(mockedDateAndTime).toDate();
    jasmine.clock().mockDate(today);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.uk-table').innerText).toContain("Portfolio");
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });
});
