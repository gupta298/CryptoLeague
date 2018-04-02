import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

import { League } from '../league';

import { UserService } from '../services/index'

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
  topSeventyFive: number;
  topFifty: number;
  topPool: number;
  middlePool: number;
  lowerPool: number;
  loading: boolean = false;
  buy_in: number;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
  	private userService: UserService,
  	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  	if(this.league.portfolio_ids){
	    this.length = this.league.portfolio_ids.length;
      this.totalPool = this.league.buy_in * length;

      let numTop25 = 0, numTop50 = 0, numTop75 = 0;
      for(let i = 0; i < this.league.portfolio_ids.length; i++){
        if(this.league.portfolio_ids[i].rank <= 25)
          numTop25++;
        if(this.league.portfolio_ids[i].rank <= 50)
          numTop50++;
        if(this.league.portfolio_ids[i].rank <= 75)
          numTop75++;
      }
      this.topTwentyFive = numTop25;
      this.topFifty = numTop50;
      this.topSeventyFive = numTop75;

      console.log(this.topTwentyFive);

      let a = 0, b = 0, c = 0;
      for(let i = 0; i < this.league.portfolio_ids.length; i++){
        if(this.league.portfolio_ids[i].rank <= 25) {
          a += (0.2 * this.totalPool) / this.topTwentyFive;
        }
        if(this.league.portfolio_ids[i].rank <= 50) {
          b += (0.3 * this.totalPool) / this.topFifty;
        }
        if(this.league.portfolio_ids[i].rank <= 75) {
          c += (0.5 * this.totalPool) / this.topSeventyFive;
        }
      }
      a = a + b + c;
      b = b + c;
      this.topPool = a.toFixed(3);
      this.middlePool = b.toFixed(3);
      this.lowerPool = c.toFixed(3);
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
  			this.router.navigate(['/']);
  		}
  	);
  }
}
