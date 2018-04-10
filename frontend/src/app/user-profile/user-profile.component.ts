import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService, AlertService, AuthenticationService } from '../services/index';

import { User } from '../user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	loading: boolean = true;
	username: string;
	user: User;

  constructor(
  	private userService: UserService,
  	private alertService: AlertService,
  	private authService: AuthenticationService,
  	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
      //debugger;
      if(!params['id']){
        this.user = this.authService.loadUserFromLocalStorage();
        this.loading = false;
      } else {
        this.username = params['id'];
        this.loading = true;
        this.userService.getUserByUsername(this.username).subscribe(
          result => {
          	this.user = new User();
          	this.user.deserialize(result);
          	console.log(result);
          	this.loading = false;
          }, error => {
          	this.loading = false;
            console.log(error);
            this.alertService.error(JSON.parse(error._body).message);
            //this.router.navigate(['/']);
          }
        );
      }
    });
  }

}
