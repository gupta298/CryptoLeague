import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AlertService]
    });
  });

  it('should be created (USER STORY #9)', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
