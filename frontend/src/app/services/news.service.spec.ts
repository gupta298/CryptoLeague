import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { NewsService, AuthenticationService } from '../services';

describe('NewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [ HttpModule, RouterTestingModule ], 
      	providers: [ NewsService, AuthenticationService ]
    });
  });

  it('should be created', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));
});
