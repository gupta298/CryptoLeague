import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { LeagueService, AuthenticationService } from '../services';

describe('LeagueService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ HttpModule, RouterTestingModule ], 
			providers: [ LeagueService, AuthenticationService ]
		});
	});

	it('should be created', inject([LeagueService], (service: LeagueService) => {
		expect(service).toBeTruthy();
	}));
});
