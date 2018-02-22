import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';

import { SidebarComponent } from './sidebar.component';

import { AuthenticationService } from '../services';

import { User } from '../user';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

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
      imports: [ RouterTestingModule ],
      declarations: [ SidebarComponent ],
      providers: [ {provide: AuthenticationService, useValue: userServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
