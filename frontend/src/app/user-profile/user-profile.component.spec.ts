import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserPastLeaguesComponent } from '../user-past-leagues/user-past-leagues.component';
import { FormsModule } from '@angular/forms';

import { UserProfileComponent } from './user-profile.component';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthenticationService, UserService, AlertService } from '../services/index'; 
import { User } from '../user';



describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  let userServiceStub = {
    loadUserFromLocalStorage() {
      let currentUser = new User();
      currentUser.firstname = "Nisarg";
      return currentUser;
    },

    generateJwt() {
      let jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken });
            return new RequestOptions({ headers: headers });
        } else {
            return null;
        }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule, FormsModule ],
      declarations: [ UserProfileComponent, SidebarComponent, UserPastLeaguesComponent ],
      providers: [ {provide: AuthenticationService, useValue: userServiceStub }, UserService, AlertService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate past leagues table', () => {
    expect(fixture.nativeElement.querySelector('.uk-card-large').innerText).toContain("Leagues Participated:");
  });

});

describe('UserProfileStatistics', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  let userServiceStub = {
    loadUserFromLocalStorage() {
      let currentUser = new User();
      currentUser.firstname = "Nisarg";
      return currentUser;
    },

    generateJwt() {
      let jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken });
            return new RequestOptions({ headers: headers });
        } else {
            return null;
        }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule, FormsModule ],
      declarations: [ UserProfileComponent, SidebarComponent, UserPastLeaguesComponent ],
      providers: [ {provide: AuthenticationService, useValue: userServiceStub }, UserService, AlertService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate the statistics card', () => {
    expect(fixture.nativeElement.querySelector('.userpic').innerText).toContain("tokens");
  });

});
