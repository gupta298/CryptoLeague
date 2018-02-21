import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { UserService, AuthenticationService } from '../services';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [HttpModule], 
      	providers: [ UserService, AuthenticationService ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
