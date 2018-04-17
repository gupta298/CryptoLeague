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
    email_notification: boolean = false;

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
    if(this.user.username !== this.usernameNew) {
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
                        console.log('this is the notif');
                        console.log(this.user.email_notification);
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
        console.log('this is the Notif');
        console.log(this.user.email_notification);
      this.userService.updateUser(this.user)
        .subscribe(
          result => {
            console.log(result);
            this.authService.saveJwt(result.jwt);
          }, error => {
            console.log(error);
          }
        );
      this.loading = true;
      this.success = false;
    }
	}

}
