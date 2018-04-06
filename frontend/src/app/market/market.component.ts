import { Component, OnInit } from '@angular/core';

import { MarketService, AlertService } from '../services/index'; 


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

	coinArray: any[] = [];

  	constructor(
  		private marketService: MarketService,
  		private alertService: AlertService) { }

  	ngOnInit() {
  		this.marketService.getMarketData()
	      .subscribe(
	        result => {
	          this.coinArray = result;
	          console.log(result);
	        }, error => {
	        	this.alertService.error(JSON.parse(error._body).message);
	          console.log(error);
	        }
	    );
  	}

}
