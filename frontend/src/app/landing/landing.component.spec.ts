import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService, UserService, AlertService } from '../services';

import { LandingComponent } from './landing.component';

import { User } from '../user';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

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
      imports: [ HttpModule, FormsModule, RouterTestingModule ],
      declarations: [ LandingComponent ],
      providers: [ {provide: AuthenticationService, useValue: userServiceStub }, UserService, AlertService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
