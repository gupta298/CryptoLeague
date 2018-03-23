import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueWaitingOverlayComponent } from './league-waiting-overlay.component';

describe('LeagueWaitingOverlayComponent', () => {
  let component: LeagueWaitingOverlayComponent;
  let fixture: ComponentFixture<LeagueWaitingOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueWaitingOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueWaitingOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
