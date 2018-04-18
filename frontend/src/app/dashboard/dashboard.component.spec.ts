import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { AuthenticationService, NewsService, UserService, LeagueService, AlertService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub';
import { UserServiceStub } from '../stubs/user.service.stub';

import { User } from '../user';
import { League } from '../league'

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ DashboardComponent, SidebarComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, NewsService, { provide: UserService, useClass: UserServiceStub }, LeagueService, AlertService ]
    })
    fixture = TestBed.createComponent(DashboardComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
