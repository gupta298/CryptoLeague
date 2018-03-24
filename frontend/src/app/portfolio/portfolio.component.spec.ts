import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { PortfolioComponent } from './portfolio.component';

import { AuthenticationService, MarketService, PortfolioService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub'

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, HttpModule, RouterTestingModule ],
      declarations: [ PortfolioComponent ],
      providers: [ { provide: AuthenticationService, useClass: AuthenticationServiceStub }, MarketService, PortfolioService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
