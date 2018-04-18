import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService, AlertService, AuthenticationService } from '../services/index';

import { User } from '../user';

declare var UIkit: any;

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
  numTokens: number = 0;
  formSubmitted: boolean = false;

  constructor(
  	private userService: UserService,
  	private alertService: AlertService,
  	private authService: AuthenticationService,
  	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
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
              let totalRank = 0, totalGains = 0, totalPayout = 0;
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

  sendTokens(){
    this.sendingTokens = true;
    this.userService.sendTokens(this.user.username, this.numTokens).subscribe(
      result => {
        console.log(result);
        this.authService.saveJwt(result.jwt);
        this.loadUsers();
        this.sendingTokens = false;
        this.formSubmitted = false;
        this.alertService.success("Tokens Sent Successfully.");
        UIkit.modal('#sendTokensModal').hide();
      }, error => {
        console.log(error);
        this.sendingTokens = false;
        this.formSubmitted = false;
        this.alertService.error(JSON.parse(error._body).message);
        UIkit.modal('#sendTokensModal').hide();
      }
    );
  }

  sendMax() {
    this.numTokens = this.currentUser.tokens - 25;
  }

  setFormSubmittedTrue() {
    this.formSubmitted = true;
  }

  setFormSubmittedFalse() {
    this.formSubmitted = false;
    UIkit.modal('#sendTokensModal').hide();
  }

}
