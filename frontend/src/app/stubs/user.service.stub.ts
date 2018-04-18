import { Injectable } from '@angular/core';
import { UserService } from '../services'
import { User } from '../user'
import {Observable} from 'rxjs/Rx';


export class UserServiceStub extends UserService {

  getUser() :Observable<any>{
    let currentUser = {
        "_id" : "5ab89e68fff7a779d365e078",
        "past_leagues" : [],
        "id" : "108553822349472014578",
        "email" : "fake@one.com",
        "lastname" : "Player",
        "firstname" : "TestOne",
        "username" : "testOne",
        "profilePicture" : "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
        "tokens" : 25,
        "currentLeague_id" : null
    };
    return Observable.of(currentUser);
  }

  getUserByUsername(username: string) :Observable<any>{
    let currentUser = {
        "_id" : "5ab89e68fff7a779d3653213",
        "past_leagues" : [],
        "id" : "1085538223494720145231",
        "email" : "fake@two.com",
        "lastname" : "Player",
        "firstname" : "TestTwo",
        "username" : "testTwo",
        "profilePicture" : "https://lh4.googleusercontent.com/-jjL-HnHxONw/AAAAAAAAAAI/AAAAAAAADF4/CT-HTv5PIow/photo.jpg?sz=500",
        "tokens" : 25,
        "currentLeague_id" : null
    };
    return Observable.of(currentUser);
  }

  getTotalUsers() {
    let res = {
        "totalUsers": 68
    };
    return Observable.of(res);
  }

  getRankings(page: number) {
    let res = [
    {
        "_id": "5ac941226681b03a0126f999",
        "past_leagues": [
            {
                "league_type": "Platinum League",
                "league_id": "3",
                "user_payout": 100,
                "user_rank": 1,
                "portfolio_value": -0.027854524418947597
            },
            {
                "league_type": "Platinum League",
                "league_id": "6",
                "user_payout": 100,
                "user_rank": 1,
                "portfolio_value": 0
            }
        ],
        "id": null,
        "email": null,
        "lastname": null,
        "firstname": null,
        "username": "ritwik098",
        "profilePicture": "http://graph.facebook.com/1756230424397990/picture?type=large",
        "tokens": 10865,
        "currentLeague_id": "6",
        "email_notification": true
    }];
    return Observable.of(res);
  }

  isUsernameValid(user: User) {
    let res = {
        "exists": false
    };
    return Observable.of(res);
  }

  getAllUsernames() {
    let res = [
    "ARU5H1",
    "AdityaSharma1999",
    "AmoraIsBetter"];
    return Observable.of(res);
  }

  updateUser(user: User) {
    let res = {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM3YTIzNzFjNzkzODNjZjJhZmIwZjIiLCJwYXN0X2xlYWd1ZXMiOlt7ImxlYWd1ZV90eXBlIjoiUGxhdGludW0gTGVhZ3VlIiwibGVhZ3VlX2lkIjoiMyIsInVzZXJfcGF5b3V0IjoxMDAsInVzZXJfcmFuayI6MSwicG9ydGZvbGlvX3ZhbHVlIjotMC4wMjc4NTQ1MjQ0MTg5NDc1OTd9LHsibGVhZ3VlX3R5cGUiOiJQbGF0aW51bSBMZWFndWUiLCJsZWFndWVfaWQiOiI2IiwidXNlcl9wYXlvdXQiOjEwMCwidXNlcl9yYW5rIjoxLCJwb3J0Zm9saW9fdmFsdWUiOjB9LHsibGVhZ3VlX2lkIjoiNiJ9XSwiaWQiOiIxOTY0MTI0MTczNjAxMjU2IiwiZW1haWwiOiJib2JieS5ndXB0YTExNUBnbWFpbC5jb20iLCJsYXN0bmFtZSI6IktvbGhlIiwiZmlyc3RuYW1lIjoiTmlzYXJnIiwidXNlcm5hbWUiOiJuaXNhcmdfZmIiLCJwcm9maWxlUGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tWGRVSXFkTWtDV0EvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvNDI1MnJzY2J2NU0vcGhvdG8uanBnP3N6PTUwMCIsInRva2VucyI6NzAsImN1cnJlbnRMZWFndWVfaWQiOiI2IiwiZW1haWxfbm90aWZpY2F0aW9uIjp0cnVlLCJpYXQiOjE1MjQwMjE2ODcsImV4cCI6MTUyNDEwODA4NywiYXVkIjoieW91cnNpdGUubmV0IiwiaXNzIjoiYWNjb3VudHMuZXhhbXBsZXNvZnQuY29tIiwic3ViIjoiMTk2NDEyNDE3MzYwMTI1NiJ9.UlQY0d6piMXdISlCcPWWZVxHmkwYhVfs8XfPV1rH_QI"
};
    return Observable.of(res); 
  }

  getCurrentUserRank(user: User) {
    let res = {
      "rank": 15
    };
    return Observable.of(res);
  }

  quitLeague(){
    let res = {
      "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM3YTIzNzFjNzkzODNjZjJhZmIwZjIiLCJwYXN0X2xlYWd1ZXMiOlt7ImxlYWd1ZV90eXBlIjoiUGxhdGludW0gTGVhZ3VlIiwibGVhZ3VlX2lkIjoiMyIsInVzZXJfcGF5b3V0IjoxMDAsInVzZXJfcmFuayI6MSwicG9ydGZvbGlvX3ZhbHVlIjotMC4wMjc4NTQ1MjQ0MTg5NDc1OTd9LHsibGVhZ3VlX3R5cGUiOiJQbGF0aW51bSBMZWFndWUiLCJsZWFndWVfaWQiOiI2IiwidXNlcl9wYXlvdXQiOjEwMCwidXNlcl9yYW5rIjoxLCJwb3J0Zm9saW9fdmFsdWUiOjB9LCI2Il0sImlkIjoiMTk2NDEyNDE3MzYwMTI1NiIsImVtYWlsIjoiYm9iYnkuZ3VwdGExMTVAZ21haWwuY29tIiwibGFzdG5hbWUiOiJLb2xoZSIsImZpcnN0bmFtZSI6Ik5pc2FyZyIsInVzZXJuYW1lIjoibmlzYXJnX2ZiIiwicHJvZmlsZVBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vLVhkVUlxZE1rQ1dBL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBLzQyNTJyc2NidjVNL3Bob3RvLmpwZz9zej01MDAiLCJ0b2tlbnMiOjcwLCJjdXJyZW50TGVhZ3VlX2lkIjpudWxsLCJlbWFpbF9ub3RpZmljYXRpb24iOnRydWUsImlhdCI6MTUyNDAyMTc2MywiZXhwIjoxNTI0MTA4MTYzLCJhdWQiOiJ5b3Vyc2l0ZS5uZXQiLCJpc3MiOiJhY2NvdW50cy5leGFtcGxlc29mdC5jb20iLCJzdWIiOiIxOTY0MTI0MTczNjAxMjU2In0.FzO2BOBgr78YiAqY3tnPCZULoqZvxVTp0h_kIO77RRo"
    };
    return Observable.of(res);
  }

  sendTokens(toUser: string, tokens: number){
    let res = {
      "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWM3YTIzNzFjNzkzODNjZjJhZmIwZjIiLCJwYXN0X2xlYWd1ZXMiOlt7ImxlYWd1ZV90eXBlIjoiUGxhdGludW0gTGVhZ3VlIiwibGVhZ3VlX2lkIjoiMyIsInVzZXJfcGF5b3V0IjoxMDAsInVzZXJfcmFuayI6MSwicG9ydGZvbGlvX3ZhbHVlIjotMC4wMjc4NTQ1MjQ0MTg5NDc1OTd9LHsibGVhZ3VlX3R5cGUiOiJQbGF0aW51bSBMZWFndWUiLCJsZWFndWVfaWQiOiI2IiwidXNlcl9wYXlvdXQiOjEwMCwidXNlcl9yYW5rIjoxLCJwb3J0Zm9saW9fdmFsdWUiOjB9XSwiaWQiOiIxOTY0MTI0MTczNjAxMjU2IiwiZW1haWwiOiJuaXNhcmdfa29saGVAeWFob28uY28uaW4iLCJsYXN0bmFtZSI6IktvbGhlIiwiZmlyc3RuYW1lIjoiTmlzYXJnIiwidXNlcm5hbWUiOiJuaXNhcmdfZmIiLCJwcm9maWxlUGljdHVyZSI6Imh0dHA6Ly9ncmFwaC5mYWNlYm9vay5jb20vMTk2NDEyNDE3MzYwMTI1Ni9waWN0dXJlP3R5cGU9bGFyZ2UiLCJ0b2tlbnMiOjkwNSwiY3VycmVudExlYWd1ZV9pZCI6IjYiLCJlbWFpbF9ub3RpZmljYXRpb24iOmZhbHNlLCJpYXQiOjE1MjM5NDUxMjcsImV4cCI6MTUyNDAzMTUyNywiYXVkIjoieW91cnNpdGUubmV0IiwiaXNzIjoiYWNjb3VudHMuZXhhbXBsZXNvZnQuY29tIiwic3ViIjoiMTk2NDEyNDE3MzYwMTI1NiJ9.L0YTbgbQVjTgh_UCRtFfbRkZH-fhdEZBP1b_HDlhwYs"
    };
    return Observable.of(res);
  }

  public convertJsonToFormData(item){
    var formData = new FormData();

    for (var key in item) {
      if(item[key] !== undefined && item[key] !== null
        //Numbers and objects are always allowed, otherwise the length must be greater than 0
        && ((typeof item[key] === "number")
        || (typeof item[key] === "boolean")
        || (typeof item[key] === "object")
        || (typeof item[key] === "string" && item[key].length && item[key].length > 0))) {
          formData.append(key, item[key]);
        } else {
          console.log("Excluding " + key);
        }
    }

    return formData;
  }

}
