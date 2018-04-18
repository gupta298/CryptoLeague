import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { UserProfileComponent } from './user-profile.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserPastLeaguesComponent } from '../user-past-leagues/user-past-leagues.component';

import { AuthenticationService, UserService, AlertService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub';

import { UserServiceStub } from '../stubs/user.service.stub';
import { User } from '../user';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ UserProfileComponent, SidebarComponent, UserPastLeaguesComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, { provide: UserService, useClass: UserServiceStub }, AlertService ]
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
     let currentUser = new User();
      currentUser.firstname = "John";
      currentUser.lastname = "Doe";
      currentUser.username = "johndoe";
      currentUser.email = "johndoe@email.com";
      currentUser.jwtToken = "";
      currentUser.profilePicture = "";
      currentUser.tokens = 25;
      currentUser.currentLeague_id = null;
      currentUser.pastLeagues = [];
      currentUser.email_notification = false;
      component.user = currentUser;
      fixture.detectChanges();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UserProfileComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create (USER STORY #4)', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should display stats (USER STORY #4)', () => {
    expect(fixture.nativeElement.querySelector('.uk-card-large').innerText).toContain("Leagues Participated:");
  });

});

describe('UserProfileStatistics', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ UserProfileComponent, SidebarComponent, UserPastLeaguesComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, { provide: UserService, useClass: UserServiceStub }, AlertService, { provide: ActivatedRoute, useValue: { params: Observable.of({id: 'fakeTwo'})}} ]
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
     let currentUser = new User();
      currentUser.firstname = "John";
      currentUser.lastname = "Doe";
      currentUser.username = "johndoe";
      currentUser.email = "johndoe@email.com";
      currentUser.jwtToken = "";
      currentUser.profilePicture = "";
      currentUser.tokens = 25;
      currentUser.currentLeague_id = null;
      currentUser.pastLeagues = [];
      currentUser.email_notification = false;
      component.currentUser = currentUser;
      let user = new User();
      user.firstname = "John";
      user.lastname = "Doe";
      user.username = "notjohndoe";
      user.email = "johndoe@email.com";
      user.jwtToken = "";
      user.profilePicture = "";
      user.tokens = 25;
      user.currentLeague_id = null;
      user.pastLeagues = [];
      user.email_notification = false;
      component.user = user;
      fixture.detectChanges();
  });

  it('should populate the statistics card (USER STORY #5)', () => {
    expect(fixture.nativeElement.querySelector('.userpic').innerText).toContain("tokens");
  });
});

describe('SendTokens', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ UserProfileComponent, SidebarComponent, UserPastLeaguesComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, { provide: UserService, useClass: UserServiceStub }, AlertService, { provide: ActivatedRoute, useValue: { params: Observable.of({id: 'fakeTwo'})}} ]
    });
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
     let currentUser = new User();
      currentUser.firstname = "John";
      currentUser.lastname = "Doe";
      currentUser.username = "johndoe";
      currentUser.email = "johndoe@email.com";
      currentUser.jwtToken = "";
      currentUser.profilePicture = "";
      currentUser.tokens = 25;
      currentUser.currentLeague_id = null;
      currentUser.pastLeagues = [];
      currentUser.email_notification = false;
      component.currentUser = currentUser;
      let user = new User();
      user.firstname = "John";
      user.lastname = "Doe";
      user.username = "notjohndoe";
      user.email = "johndoe@email.com";
      user.jwtToken = "";
      user.profilePicture = "";
      user.tokens = 25;
      user.currentLeague_id = null;
      user.pastLeagues = [];
      user.email_notification = false;
      component.user = user;
      fixture.detectChanges();
  });

  it('should populate sendTokens icon', () => {
    expect(fixture.nativeElement.querySelector('.fa-paper-plane')).not.toBeNull(true);
  });

  it('should populate the modal', () => {
    let button = fixture.debugElement.nativeElement.querySelector('.fa-paper-plane');
    button.click();
    expect(fixture.nativeElement.querySelector('.uk-modal-dialog')).not.toBeNull("Recipient");
  });
});
