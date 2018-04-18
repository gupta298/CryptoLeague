import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LeaderboardComponent } from './leaderboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';

import { AuthenticationService, UserService, AlertService } from '../services/index'; 

import { AuthenticationServiceStub } from '../stubs/authentication.service.stub';
import { UserServiceStub } from '../stubs/user.service.stub';

import { User } from '../user';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LeaderboardComponent, SidebarComponent ],
      providers: [ {provide: AuthenticationService, useClass: AuthenticationServiceStub }, { provide: UserService, useClass: UserServiceStub }, AlertService ]
    })
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search bar should populate (USER STORY #3)', () => {
    expect(fixture.nativeElement.querySelector('.uk-search-input')).not.toBeNull();
  });

  it('should populate user in the search drop-down (USER STORY #3)', () => {
    fixture.componentInstance.searchResults = ["user1", "user2"];
    let button = fixture.debugElement.nativeElement.querySelector('.background');
    button.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.background').innerText).toContain("user1");
  });

});