import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';

import { Router } from '@angular/router';
import { User } from '../user'

@Injectable()
export class AuthenticationService {

  jwtHelper: JwtHelper = new JwtHelper();

  	constructor(private router: Router) { }

  	saveJwt(jwtToken: string){
  		  localStorage.setItem('currentUser', JSON.stringify(this.jwtHelper.decodeToken(jwtToken)));
        localStorage.setItem('jwtToken', jwtToken);
  	}

	  generateJwt() {
        // create authorization header with jwt token
        //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + jwtToken });
            return new RequestOptions({ headers: headers });
        } else {
            return null;
        }
    }

    loadUserFromLocalStorage() {
	    let currentUser = new User();
	    let jsonData = JSON.parse(localStorage.getItem("currentUser"));
	    if(jsonData){
		   	let user = new User();
		   	user.deserialize(jsonData);
        // if(user.username == null) {
        //   this.router.navigate(['/landing']);
        // }
		   	return user;
		  } else {
			  return null;
		  }
	  }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('jwtToken');
    }
}
