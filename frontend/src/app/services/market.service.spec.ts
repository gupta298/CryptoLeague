import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MarketService, AuthenticationService } from '../services';

describe('MarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [HttpModule, RouterTestingModule],
      	providers: [MarketService, AuthenticationService]
    });
  });

  it('should be created', inject([MarketService], (service: MarketService) => {
    expect(service).toBeTruthy();
  }));
});
