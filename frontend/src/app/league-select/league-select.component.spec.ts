import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Http, Headers, Response, RequestOptions } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LeagueSelectComponent } from './league-select.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { LeagueService, AuthenticationService } from '../services';
import { AuthenticationServiceStub } from '../stubs/authentication.service.stub'

describe('LeagueSelectComponent', () => {
  let component: LeagueSelectComponent;
  let fixture: ComponentFixture<LeagueSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ LeagueSelectComponent, SidebarComponent ],
      providers: [ LeagueService, { provide: AuthenticationService, useClass: AuthenticationServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueSelectComponent);
    component = fixture.componentInstance;
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
