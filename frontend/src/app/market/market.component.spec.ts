import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MarketComponent } from './market.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { AuthenticationService, MarketService, AlertService } from '../services/index'; 
import { MarketServiceStub } from '../stubs/market.service.stub';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub' 
import { User } from '../user';

describe('MarketComponent', () => {
  let component: MarketComponent;
  let fixture: ComponentFixture<MarketComponent>;
  let marketService: MarketServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ MarketComponent, SidebarComponent ],
      providers: [ {provide: AuthenticationService, useClass: AuthenticationServiceStub }, {provide: MarketService, useValue: marketService}, AlertService ]
    })
    marketService = TestBed.get(MarketService);
    fixture = TestBed.createComponent(MarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
