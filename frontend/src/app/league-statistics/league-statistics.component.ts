import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { League } from '../league';

import { UserService, AlertService } from '../services/index'

declare var UIkit: any;

@Component({
  selector: 'app-league-statistics',
  templateUrl: './league-statistics.component.html',
  styleUrls: ['./league-statistics.component.scss']
})
export class LeagueStatisticsComponent implements OnInit {

	@Input() league: League;
	@Input() rank: number;
	@Input() leader: string;
	@Input() timeRemaining: string;
	@Input() status: string;
	@Input() hideCards: boolean;

	length: number;
  totalPool: number;
  topTwentyFive: number;
  topPool: number;
  topFifty: number;
  loading: boolean = false;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
  	private userService: UserService,
    private alertService: AlertService,
  	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChange) {
  	if(this.league.portfolio_ids && this.league.status >= 2){
      //this.buy_in = this.league.league_buy_in;
      //console.log(this.league);
      //this.totalPool = this.buy_in * length;
	    this.length = this.league.portfolio_ids.length;
	    // this.topTen = Math.ceil(this.length / 10);
	    // this.topTwentyfive = Math.ceil(this.length / 4);
	    // this.topFifty = Math.ceil(this.length / 2);

      //let numTop25 = 0, numTop50 = 0, numTop75 = 0;
      // for(let i = 0; i < this.league.portfolio_ids.length; i++){
      //   if(this.league.portfolio_ids[i].rank <= 25)
      //     this.topTwentyFive++;
      //   if(this.league.portfolio_ids[i].rank <= 50)
      //     this.topFifty++;
      //   if(this.league.portfolio_ids[i].rank <= 75)
      //     this.topSeventyFive++;
      // }
      // this.topTwentyFive = numTop25;
      // this.topFifty = numTop50;
      // this.topSeventyFive = numTop75;

      for(let i = 0; i < this.league.portfolio_ids.length; i++){
        if(this.league.portfolio_ids[i].rank <= 25) {
          this.topPool += (0.2 * this.totalPool) / this.topTwentyFive;
        }
        if(this.league.portfolio_ids[i].rank <= 50) {
        //  this.middlePool += (0.3 * this.totalPool) / this.topFifty;
        }
        if(this.league.portfolio_ids[i].rank <= 75) {
        //  this.lowerPool += (0.5 * this.totalPool) / this.topSeventyFive;
        }
      }
	  }
  }

  getStatus(leagueStatus: number){
    switch (leagueStatus) {
      case 0:
        return "Waiting";
      case 1:
      case 2:
        return "Portfolio Edit Period";
      case 3:
        return "Started";
      case 4:
      	return "Ended"
      default:
        return "Waiting";
    }
  }

  quitLeagueOnCLick(){
  	this.loading = true;
  	UIkit.alert('#quitAlert', {});
  	this.userService.quitLeague().subscribe(
  		result => {
  			this.loading = false;
  			UIkit.alert('#quitAlert', {}).close();
  			var user = this.jwtHelper.decodeToken(result.jwt);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('jwtToken', result.jwt);
  			this.router.navigate(['/']);
  		}, error => {
				this.loading = false;
				console.log(error);
        this.alertService.error(JSON.parse(error._body).message);
  			this.router.navigate(['/']);
  		}
  	);
  }
}
