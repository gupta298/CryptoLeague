import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueSelectComponent } from './league-select.component';

describe('LeagueSelectComponent', () => {
  let component: LeagueSelectComponent;
  let fixture: ComponentFixture<LeagueSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueSelectComponent ]
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
});
