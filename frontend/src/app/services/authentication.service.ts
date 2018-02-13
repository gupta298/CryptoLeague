import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

import { User } from '../user'

@Injectable()
export class AuthenticationService {

  jwtHelper: JwtHelper = new JwtHelper();

  	constructor() { }

  	saveJwt(user: User){
  		localStorage.setItem('currentUser', JSON.stringify(this.jwtHelper.decodeToken(user.jwtToken)));
        localStorage.setItem('jwtToken', user.jwtToken);
        console.log("token decoded", this.jwtHelper.decodeToken(user.jwtToken));
  	}

	generateJwt() {
        // create authorization header with jwt token
        //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken });
            return new RequestOptions({ headers: headers });
        } else {
            return false;
        }
    }

    loadUserFromLocalStorage() {
	    let currentUser = new User();
	    let jsonData = JSON.parse(localStorage.getItem("currentUser"));
	   	let user = new User();
	   	user.deserialize(jsonData);
	   	return user;
	}
}
