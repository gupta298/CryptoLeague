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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check if modal is populating correctly, and with the right message', () => {
    expect(fixture.nativeElement.querySelector('.ng-test-portfolio').innerText).toContain("validating");
  });

  it('check if portfolio list view appears on card click', () => {
    let portfolio = [{"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}, {"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}];
    component.portfolioFieldArray = portfolio;
    component.hideCards = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#portfolio-list')).not.toBeNull();
  });

  it('check if portfolio list view appears does not appear on non-expanded view', () => {
    let portfolio = [{"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}, {"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}];
    component.portfolioFieldArray = portfolio;
    component.hideCards = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#portfolio-list')).toBeNull();
  });

  it('check if portfolio list view populates', () => {
    let portfolio = [{"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}, {"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}];
    component.portfolioFieldArray = portfolio;
    component.hideCards = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('#portfolio-list-content td')).not.toBeNull();
  });

});


describe('Portfolio table list view', () => {
  let debugTable: any;
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
    let portfolio = [{"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}, {"name":"bit","ticker":"BTC", "percentage":30, "exp_coins": 20, "price":"123"}];
    component.portfolioFieldArray = portfolio;
    component.hideCards = true;
    fixture.detectChanges();
  });

  it('should have correct coin name', () => {
    expect(fixture.nativeElement.querySelector('#portfolio-list-content').innerText).toContain("bit");
  });

  it('should have correct ticker', () => {
    expect(fixture.nativeElement.querySelector('#portfolio-list-content').innerText).toContain("BTC");
  });

  it('should have correct price', () => {
    expect(fixture.nativeElement.querySelector('#portfolio-list-content').innerText).toContain("123");
  });

  it('should have correct percentage', () => {
    expect(fixture.nativeElement.querySelector('#portfolio-list-content').innerText).toContain(30);
  });

  it('should have correct expected coins', () => {
    expect(fixture.nativeElement.querySelector('#portfolio-list-content').innerText).toContain(20);
  });

});