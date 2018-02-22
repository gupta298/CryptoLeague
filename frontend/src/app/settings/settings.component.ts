import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NgForm, NgModel, NG_VALUE_ACCESSOR, FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthenticationService, UserService } from '../services/index';
import { Router } from '@angular/router';

declare var UIkit: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  	user: User;
  	submitted: boolean = false;
  	userExists: boolean = false;

   	constructor(
		private router: Router,
	    private authService: AuthenticationService,
	    private userService: UserService
	  ) { }

	onSubmit(form) { 
		this.submitted = true;
		this.userExists = false;

		console.log('username: ', this.user.username);
		this.userService.isUsernameValid(this.user)
	  		.subscribe(
	  			result => {
	  				this.submitted = false;
		          console.log("user exists: ",result);
		          if(!result.exists) {
		          	this.userService.updateUser(this.user)
						      .subscribe(
						        result => {
						          console.log(result);
						          this.authService.saveJwt(result.jwt);
						        }, error => {
						          console.log(error);
						        }
						    	);
		          } else {
		          	this.submitted = false;
		          	this.userExists = true;
		        	}
		        }, error => {
		        	this.submitted = false;

		          console.log(error);
		        }
	  		);
	}

	ngOnInit() {
		this.user = this.authService.loadUserFromLocalStorage();
	}
}