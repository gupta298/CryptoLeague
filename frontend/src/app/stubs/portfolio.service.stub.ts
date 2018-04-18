import { Injectable } from '@angular/core';
import { UserService } from '../services'
import { User } from '../user'
import {Observable} from 'rxjs/Rx';


export class PortfolioServiceStub extends UserService {

  getPortfolio() {
    let portfolio = {
        "_id": "1",
        "holdings": [
            {
                "_id": "1",
                "coin_symbol": "BTC",
                "percentage": 35
            },
            {
                "_id": "1",
                "coin_symbol": "ETH",
                "percentage": 35
            },
            {
                "_id": "1",
                "coin_symbol": "XRP",
                "percentage": 30
            }
        ],
        "captain_coin": null
    };
    return Observable.of(portfolio);
  }

  putPortfolio(port) {
    let portfolio = {
        "_id": "1",
        "holdings": [
            {
                "_id": "1",
                "coin_symbol": "BTC",
                "percentage": 35
            },
            {
                "_id": "1",
                "coin_symbol": "ETH",
                "percentage": 35
            },
            {
                "_id": "1",
                "coin_symbol": "XRP",
                "percentage": 30
            }
        ],
        "captain_coin": null
    };
    return Observable.of(portfolio);
  }

  getPortfolioByLeagueID(leagueId, userId) {
    let portfolio = {
        "_id": "1",
        "holdings": [
            {
                "_id": "1",
                "coin_symbol": "BTC",
                "percentage": 35
            },
            {
                "_id": "1",
                "coin_symbol": "ETH",
                "percentage": 35
            },
            {
                "_id": "1",
                "coin_symbol": "XRP",
                "percentage": 30
            }
        ],
        "captain_coin": null
    };
    return Observable.of(portfolio);
  }

}
