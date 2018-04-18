import { Injectable } from '@angular/core';
import { User } from '../user'
import { Observable } from 'rxjs/Rx';

import { LeagueService } from '../services/league.service'

@Injectable()
export class LeagueServiceStub extends LeagueService{

  getLeagueTypes(): Observable<any>{
    let leagueTypes = [
        {
            "_id": "5aa8a23df36d2876ecd2b15f",
            "league_type_id": 1,
            "buy_in": 5,
            "title": "Bronze League",
            "color": "#965A38"
        },
        {
            "_id": "5aa8a25df36d2876ecd2b164",
            "league_type_id": 2,
            "buy_in": 10,
            "title": "Silver League",
            "color": "#A8A8A8"
        },
        {
            "_id": "5aa8a271f36d2876ecd2b197",
            "league_type_id": 3,
            "buy_in": 50,
            "title": "Gold League",
            "color": "#C98910"
        },
        {
            "_id": "5aa8a27bf36d2876ecd2b19d",
            "league_type_id": 4,
            "buy_in": 100,
            "title": "Platinum League",
            "color": "#CCC2C2"
        }
    ];
    return Observable.of(leagueTypes);
  }

  getLeagueById(leagueID: string): Observable<any>{
    let league = {
        "_id": "5ad55ff72b56ae856fc00e9e",
        "portfolio_ids": [
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "username": "UtkyF",
                "tokens": 900,
                "profilePicture": "http://graph.facebook.com/10208644795717573/picture?type=large",
                "user_id": "5aca9693a4bc4e45802c8390",
                "portfolio_id": "5ad560332b56ae856fc00ea1",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            }
        ],
        "league_id": "1",
        "league_type": "Platinum League",
        "status": "4",
        "start_time": "2018-04-17T02:51:15.615Z",
        "buy_in": 100
    };
    return Observable.of(league);
  }

  getLeague(): Observable<any>{
    let league = {
        "_id": "5ad55ff72b56ae856fc00e9e",
        "portfolio_ids": [
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "_id": "5ad55ff72b56ae856fc00e9f",
                "username": "UtkyGM",
                "tokens": 9695,
                "profilePicture": "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
                "user_id": "5ac91b88a4bc4e45802c82f7",
                "portfolio_id": "5ad55ff72b56ae856fc00e9a",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            },
            {
                "username": "UtkyF",
                "tokens": 900,
                "profilePicture": "http://graph.facebook.com/10208644795717573/picture?type=large",
                "user_id": "5aca9693a4bc4e45802c8390",
                "portfolio_id": "5ad560332b56ae856fc00ea1",
                "portfolio_value": 0,
                "rank": 1,
                "payout": 100
            }
        ],
        "league_id": "1",
        "league_type": "Platinum League",
        "status": "4",
        "start_time": "2018-04-17T02:51:15.615Z",
        "buy_in": 100
    };
    return Observable.of(league);
  }

  joinLeague(leagueType: number): Observable<any> {
    let league = {
        "current_market_coin": [],
        "_id": "5ad6d52f2c5f78b28dcc820d",
        "portfolio_ids": [
            {
                "_id": "5ad6d52f2c5f78b28dcc820e",
                "username": "nisarg_fb",
                "tokens": 70,
                "profilePicture": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=500",
                "user_id": "5ac7a2371c79383cf2afb0f2",
                "portfolio_id": "5ad6d52f2c5f78b28dcc8209",
                "portfolio_value": null
            }
        ],
        "league_id": "8",
        "league_type": "Bronze League",
        "league_buy_in": 5,
        "status": "0",
        "start_time": null
    };
    return Observable.of(league);
  }
}
