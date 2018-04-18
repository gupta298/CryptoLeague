import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit, Input } from '@angular/core';

import { UserPastLeaguesComponent } from './user-past-leagues.component';

import { User } from '../user';

describe('UserPastLeaguesComponent', () => {
  let component: UserPastLeaguesComponent;
  let fixture: ComponentFixture<UserPastLeaguesComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPastLeaguesComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    let currentUser = new User();
    currentUser.firstname = "John";
    currentUser.lastname = "Doe";
    currentUser.username = "johndoe";
    currentUser.email = "johndoe@email.com";
    currentUser.jwtToken = "";
    currentUser.profilePicture = "";
    currentUser.tokens = 25;
    currentUser.currentLeague_id = null;
    currentUser.pastLeagues = [];
    currentUser.email_notification = false;
    testHostComponent.user = currentUser;
    testHostFixture.detectChanges();
  });

  it('should create (USER STORY #6)', () => {
    expect(testHostComponent).toBeTruthy();
  });

  @Component({
    selector: `host-component`,
    template: `<app-user-past-leagues
        [user]="user"
      ></app-user-past-leagues>`
  })
  class TestHostComponent {
    user: User;

    setUser(user: User) {
      this.user = user;
    }
  }
});
