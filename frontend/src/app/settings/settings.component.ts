import { Component, OnInit} from '@angular/core';
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
  	loading: boolean = false;
  	success: boolean = false;
  	userExists: boolean = false;
    usernameChange: boolean = false;
    profilePictureChange: boolean = false;
    submitted: boolean = false;
    usernameNew: String = null;

   	constructor(
		private router: Router,
	    private authService: AuthenticationService,
	    private userService: UserService
	  ) { }

  	ngOnInit() {
  		this.user = this.authService.loadUserFromLocalStorage();
      this.usernameNew = this.user.username;
  	}

	onSubmit() {
		this.loading = true;
    console.log(this.user.username);
    console.log(this.usernameNew);
    if(this.user.username !== this.usernameNew){
      this.userExists = false;
      this.userService.isUsernameValid(this.user)
          .subscribe(
            result => {
              this.loading = false;
              this.success = true;
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
                  this.loading = false;
                  this.userExists = true;
                  this.success = false;
                }
              }, error => {
                this.loading = false;
                this.success = false;
                console.log(error);
              }
          );
          this.usernameNew = this.user.username;
    }
    else{
      this.loading = true;
      this.success = false;
    }
	}

}
