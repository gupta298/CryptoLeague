import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LeagueSelectComponent } from './league-select.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { LeagueService, AuthenticationService, AlertService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub'

describe('LeagueSelectComponent', () => {
  let component: LeagueSelectComponent;
  let fixture: ComponentFixture<LeagueSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LeagueSelectComponent, SidebarComponent ],
      providers: [ LeagueService, { provide: AuthenticationService, useClass: AuthenticationServiceStub }, AlertService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueSelectComponent);
    component = fixture.componentInstance;
    component.leagues = [{"_id":"5aa8a23df36d2876ecd2b15f","league_type_id":1,"buy_in":5,"title":"Bronze League","color":"#965A38"},{"_id":"5aa8a25df36d2876ecd2b164","league_type_id":2,"buy_in":10,"title":"Silver League","color":"#A8A8A8"},{"_id":"5aa8a271f36d2876ecd2b197","league_type_id":3,"buy_in":50,"title":"Gold League","color":"#C98910"},{"_id":"5aa8a27bf36d2876ecd2b19d","league_type_id":4,"buy_in":100,"title":"Platinum League","color":"#CCC2C2"}];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 4 league types', () => {
    expect(fixture.nativeElement.querySelectorAll('.leagueCard').length).toEqual(4);
  });

  it('should show Bronze league', () => {
    expect(fixture.nativeElement.querySelector('.page-content').innerText).toContain("Bronze League");
  });

  it('should show Silver league', () => {
    expect(fixture.nativeElement.querySelector('.page-content').innerText).toContain("Silver League");
  });

  it('should show Gold league', () => {
    expect(fixture.nativeElement.querySelector('.page-content').innerText).toContain("Gold League");
  });

  it('should show Platinum league', () => {
    expect(fixture.nativeElement.querySelector('.page-content').innerText).toContain("Platinum League");
  });
});
