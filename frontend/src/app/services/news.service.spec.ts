import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { NewsService, AuthenticationService } from '../services';

describe('NewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [ HttpModule ], 
      	providers: [ NewsService, AuthenticationService ]
    });
  });

  it('should be created', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));
});
