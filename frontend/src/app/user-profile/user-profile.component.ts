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
  currentUser: User;
  avgPortfolioGains: number = 0;
  avgRank: number = 0;
  totalPayout: number = 0;
  sendingTokens: boolean = false;

  constructor(
  	private userService: UserService,
  	private alertService: AlertService,
  	private authService: AuthenticationService,
  	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.loadUserFromLocalStorage();
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

            if(this.user.pastLeagues.length > 0){
              let totalRank = 0, totalGains = 0, totalPayout;
              for(let league of this.user.pastLeagues){
                totalRank += league.user_rank;
                totalGains += league.portfolio_value;
                totalPayout += league.user_payout;
              }
              this.avgPortfolioGains = (totalGains / this.user.pastLeagues.length);
              this.avgRank = (totalRank / this.user.pastLeagues.length);
              this.totalPayout = totalPayout;
            }

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
