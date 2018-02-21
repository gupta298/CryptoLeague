import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { MarketService, AuthenticationService } from '../services';

describe('MarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [HttpModule],
      	providers: [MarketService, AuthenticationService]
    });
  });

  it('should be created', inject([MarketService], (service: MarketService) => {
    expect(service).toBeTruthy();
  }));
});
