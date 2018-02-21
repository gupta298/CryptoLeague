import { Component, OnInit } from '@angular/core';

import { MarketService } from '../services/index'; 


@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

	coinArray: any[] = [];

  	constructor(private marketService: MarketService) { }

  	ngOnInit() {
  		this.marketService.getMarketData()
	      .subscribe(
	        result => {
	          this.coinArray = result;
	          console.log(result);
	        }, error => {
	          console.log(error);
	        }
	    );
  	}

}
