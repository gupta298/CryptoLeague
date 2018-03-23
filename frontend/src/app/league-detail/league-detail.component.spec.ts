import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueDetailComponent } from './league-detail.component';
import { LeagueWaitingOverlayComponent } from '../league-waiting-overlay/league-waiting-overlay.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

describe('LeagueDetailComponent', () => {
  let component: LeagueDetailComponent;
  let fixture: ComponentFixture<LeagueDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueDetailComponent, LeagueWaitingOverlayComponent, SidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
