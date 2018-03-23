import { Component, OnInit, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LeagueWaitingOverlayComponent } from './league-waiting-overlay.component';
import { AuthenticationService, LeagueService } from '../services';

import { League } from '../league';

describe('LeagueWaitingOverlayComponent', () => {
  let component: LeagueWaitingOverlayComponent;
  let fixture: ComponentFixture<LeagueWaitingOverlayComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LeagueWaitingOverlayComponent, TestHostComponent ],
      providers: [ AuthenticationService, LeagueService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    let league = new League();
    league.league_id = 3;
    league.league_type = "Bronze League";
    league.status = 0;
    league.start_time = null;
    league.portfolio_ids = [{"_id":"5ab53484699da7da5c3f78bb","username":"hellx","tokens":10,"profilePicture":"http://graph.facebook.com/1964124173601256/picture?type=large","user_id":"5aa9af781a809abb10179914","portfolio_id":"5ab53484699da7da5c3f78b6"}];
    testHostComponent.setLeague(league);
    testHostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should show waiting for 9 more users', () => {
    expect(testHostFixture.nativeElement.querySelector('h3').innerText).toContain('Waiting for 9 more users');
  });

  it('should show 1 user in waiting room', () => {
    expect(testHostFixture.nativeElement.querySelectorAll('tr').length).toEqual(2);
  });

  @Component({
    selector: `host-component`,
    template: `<app-league-waiting-overlay [league]="league"></app-league-waiting-overlay>`
  })
  class TestHostComponent {
    private league: League;

    setLeague(league: League) {
      this.league = league;
    }
  }
});
