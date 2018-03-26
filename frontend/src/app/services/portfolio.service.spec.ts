import { TestBed, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { PortfolioService, AuthenticationService } from '../services';

import { Portfolio } from '../portfolio';

let testService: PortfolioService;
let mockPaste: Portfolio;
let responsePropertyNames, expectedPropertyNames;
let portfolio;
describe('PortfolioService', () => {
	beforeEach(() => {
		
		TestBed.configureTestingModule({
			imports: [ HttpModule, RouterTestingModule ], 
			providers: [ PortfolioService, AuthenticationService ]
		});

		portfolio = new Portfolio();
    portfolio.portfolio_id = "1";
    portfolio.holdings = [{"percentage":35, "coin_symbol": "BTC"}, {"percentage":35, "coin_symbol": "XRP"}, {"percentage":30, "coin_symbol": "ETH"}];
    portfolio.captain_coin = "BTC";
	});

	it('should be created', inject([PortfolioService], (service: PortfolioService) => {
		expect(service).toBeTruthy();
	}));
});
