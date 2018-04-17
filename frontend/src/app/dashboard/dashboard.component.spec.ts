import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AlertComponent } from '../alert/alert.component';

import { AuthenticationService, NewsService, UserService, LeagueService, AlertService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub';

import { User } from '../user';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ DashboardComponent, SidebarComponent, AlertComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, NewsService, UserService, LeagueService, AlertService ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
