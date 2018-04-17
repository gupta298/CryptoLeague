import { Component, OnInit, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService, LeagueService, UserService, AlertService } from '../services';

import { League } from '../league';

import { LeagueStatisticsComponent } from './league-statistics.component';

describe('LeagueStatisticsComponent', () => {
  let component: LeagueStatisticsComponent;
  let fixture: ComponentFixture<LeagueStatisticsComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LeagueStatisticsComponent, TestHostComponent ],
      providers: [ AuthenticationService, LeagueService, UserService, AlertService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    let league = new League();
    league.league_id = 3;
    league.league_type = "Bronze League";
    league.status = 1;
    league.start_time = null;
    league.portfolio_ids = [{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"_id":"5ab8541ec7d32640eb3789a0","username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab8541ec7d32640eb37899b","portfolio_value":0,"rank":1,"payout":100},{"username":"hellx","tokens":995,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab857c6c7d32640eb3789a6","portfolio_value":0,"rank":1,"payout":100}];
    testHostComponent.setLeague(league);
    testHostComponent.rank = 1;
    testHostComponent.status = "starts.";
    testHostComponent.leader = "hellx";
    testHostComponent.timeRemaining = "12h 5min 2sec";
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should show correct prize distribution', () => {
    expect(testHostFixture.nativeElement.querySelector('#statsText2').innerText).toContain("#1 - #1: 50");
    expect(testHostFixture.nativeElement.querySelector('#statsText2').innerText).toContain("#2 - #3: 37.5");
    expect(testHostFixture.nativeElement.querySelector('#statsText2').innerText).toContain("#4 - #5: 25");
  });

  it('should show correct top user', () => {
    expect(testHostFixture.nativeElement.querySelector('#statsText1').innerText).toContain("User at #1: hellx");
  });

  it('should show correct user rank', () => {
    expect(testHostFixture.nativeElement.querySelector('#statsText1').innerText).toContain("Your Rank: #1");
  });

  @Component({
    selector: `host-component`,
    template: `<app-league-statistics 
            [league]="league" 
            [rank]="rank" 
            [leader]="leader" 
            [timeRemaining]="timeRemaining"
            [status]="status">
            </app-league-statistics>`
  })
  class TestHostComponent {
    league: League;
    timeRemaining: string;
    status: string;
    rank: number;
    leader: string;

    setLeague(league: League) {
      this.league = league;
    }
  }
});
