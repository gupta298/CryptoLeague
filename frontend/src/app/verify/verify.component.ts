import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/index';

import { JwtHelper } from 'angular2-jwt';

import { User } from '../user';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  	jwtHelper: JwtHelper = new JwtHelper();
	jwtToken: string;

  	constructor(
  		private route: ActivatedRoute,
      	private router: Router,
      	private authenticationService: AuthenticationService) { }

  	ngOnInit() {
  		if(!this.authenticationService.loadUserFromLocalStorage()){
			this.jwtToken = this.route.snapshot.queryParams['token'];
 			console.log('jwtToken', this.jwtToken);

  	 		let user = new User();
  	 		user.deserialize(this.jwtHelper.decodeToken(this.jwtToken));
  	 		console.log('user', user);

  	 		if(user){
  	 			this.authenticationService.saveJwt(this.jwtToken);
  	 			this.router.navigate(['/dashboard']);
  	 		} else {
  	 			console.log('user', user);
  	 			this.router.navigate(['/', {error:'invalidToken'}]);
  	 		}
  		} else {
  			this.router.navigate(['/dashboard']);
  		}
  	}

}
