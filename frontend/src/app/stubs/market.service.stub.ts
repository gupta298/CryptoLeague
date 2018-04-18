import { Injectable } from '@angular/core';
import { MarketService } from '../services'
import { User } from '../user'
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MarketServiceStub extends MarketService {

  getMarketData(): Observable<any> {
  	let marketData = [
	    {
	        "symbol": "BTC",
	        "cap": "134786695365",
	        "change": {
	            "hour": "-0.16",
	            "day": "-0.95"
	        },
	        "price": "7936.04",
	        "coinheat": 30,
	        "url": "https://chasing-coins.com/coin/BTC",
	        "HighLowOfCoin": {
	            "ath": {
	                "id": 66020,
	                "coin": "BTC",
	                "created_at": "2017-12-17 08:01:38",
	                "updated_at": "2017-12-17 08:01:38",
	                "price_usd": "19524.320000000000000000000000000000",
	                "price_btc": "1.000000000000000000000000000000",
	                "price_date": "2017-12-17 00:00:00"
	            },
	            "month_high": {
	                "id": 188601,
	                "coin": "BTC",
	                "created_at": "2018-04-16 04:02:27",
	                "updated_at": "2018-04-16 04:02:27",
	                "price_usd": "8350.340000000000000000000000000000",
	                "price_btc": "1.000000000000000000000000000000",
	                "price_date": "2018-04-16 00:00:00"
	            },
	            "month_low": {
	                "id": 180825,
	                "coin": "BTC",
	                "created_at": "2018-04-07 04:09:18",
	                "updated_at": "2018-04-07 04:09:18",
	                "price_usd": "6626.530000000000000000000000000000",
	                "price_btc": "1.000000000000000000000000000000",
	                "price_date": "2018-04-07 00:00:00"
	            },
	            "symbol": "BTC"
	        },
	        "HighLowOfLast24Hours": {
	            "high": 8187.6,
	            "high_time": "Tue, 17 Apr 2018 07:10:00 +0000",
	            "low": 7858.12,
	            "low_time": "Tue, 17 Apr 2018 20:00:00 +0000",
	            "symbol": "BTC"
	        },
	        "image": "https://chasing-coins.com/api/v1/std/logo/BTC",
	        "name": "Bitcoin"
	    }
	  ];
	  return Observable.of(marketData);
 	}
}
