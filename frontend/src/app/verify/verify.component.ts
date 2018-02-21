import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/index';

import { JwtHelper } from 'angular2-jwt';

import { User } from '../user';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss'],
  providers: [ AuthenticationService ]
})
export class VerifyComponent implements OnInit {

  	jwtHelper: JwtHelper = new JwtHelper();
	  jwtToken: string;

  	constructor(
  		private route: ActivatedRoute,
      	private router: Router,
      	private authenticationService: AuthenticationService) { }

  	ngOnInit() {
      this.jwtToken = this.route.snapshot.queryParams['token'];
  		if(!this.authenticationService.loadUserFromLocalStorage() && this.jwtToken){
 			  console.log('jwtToken', this.jwtToken);

  	 		let user = new User();
  	 		user.deserialize(this.jwtHelper.decodeToken(this.jwtToken));
  	 		console.log('user', user);

  	 		if(user){
          this.authenticationService.saveJwt(this.jwtToken);
           if(user.username){
  	 			    this.router.navigate(['/dashboard']);
           } else {
               this.router.navigate(['/landing']);
           }
  	 		} else {
  	 			console.log('user', user);
  	 			this.router.navigate(['/', {error:'invalidToken'}]);
  	 		}
  		} else {
  			this.router.navigate(['/dashboard']);
  		}
  	}

}
