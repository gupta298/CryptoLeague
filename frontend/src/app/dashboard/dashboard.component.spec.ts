import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { AuthenticationService, NewsService } from '../services';
// import { AuthenticationServiceStub } from '../services/authentication.service.stub';

import { User } from '../user';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

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
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ DashboardComponent, SidebarComponent ],
      providers: [ {provide: AuthenticationService, useValue: userServiceStub }, NewsService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.user = new User();
    component.user.firstname = "Nisarg";
    expect(component).toBeTruthy();
  });
});
