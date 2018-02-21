import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { NgForm, NgModel, NG_VALUE_ACCESSOR, FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthenticationService, UserService } from '../services/index';
import { Router } from '@angular/router';

declare var UIkit: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

	user: User;

	constructor(
		private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,

  ) { }
  submitted = false;
 
  onSubmit(form) { 
  	this.submitted = true;
  	console.log('username: ',this.user.username);
  	this.userService.updateUser(this.user)
      .subscribe(
        result => {
          console.log(result);
          this.authService.saveJwt(result.jwt);
          this.router.navigate(['/dashboard']);

        }, error => {
          console.log(error);
        }
    	);

  }

  ngOnInit() {
  	this.user = this.authService.loadUserFromLocalStorage();
  	//console.log(this.user);
  }

}