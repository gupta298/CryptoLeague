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

   	constructor(
		private router: Router,
	    private authService: AuthenticationService,
	    private userService: UserService,

	  ) { }
  	submitted = false;

	onSubmit(form) { 
		this.submitted = true;
		console.log('username: ', this.user.username);
		this.userService.updateUser(this.user)
	  .subscribe(
	        result => {
	          console.log(result);
	          this.authService.saveJwt(result.jwt);
	        }, error => {
	          console.log(error);
	        }
		);
	}

	ngOnInit() {
		this.user = this.authService.loadUserFromLocalStorage();
	}
}