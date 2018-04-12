import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPastLeaguesComponent } from './user-past-leagues.component';

describe('UserPastLeaguesComponent', () => {
  let component: UserPastLeaguesComponent;
  let fixture: ComponentFixture<UserPastLeaguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPastLeaguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPastLeaguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
