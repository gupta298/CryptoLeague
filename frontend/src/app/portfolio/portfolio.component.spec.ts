import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { PortfolioComponent } from './portfolio.component';

import { AuthenticationService, MarketService, PortfolioService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub'

import { Portfolio } from '../portfolio';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let debugTable: any;

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
    debugTable = fixture.debugElement.queryAll(By.css('.ng-test-portfolio'));
    let portfolio = new Portfolio();
    portfolio.portfolio_id = "1";
    portfolio.holdings = [{"percentage":35, "coin_symbol": "BTC"}, {"percentage":35, "coin_symbol": "XRP"}, {"percentage":30, "coin_symbol": "ETH"}];
    portfolio.captain_coin = "BTC";
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check if modal is populating correctly, and with the right message', () => {
    expect(fixture.nativeElement.querySelector('.ng-test-portfolio').innerText).toContain("validating");
  });

});
