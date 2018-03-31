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
  topPool: number;
  middlePool: number;
  lowerPool: number;
  topTwentyFive: number;
  topFifty: number;
  topSeventyFive: number;
  loading: boolean = false;

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
  	private userService: UserService,
  	private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  	if(this.league.portfolio_ids){
      console.log(this.league);
      this.totalPool = this.league.league_buy_in * length;
	    this.length = this.league.portfolio_ids.length;
	    // this.topTen = Math.ceil(this.length / 10);
	    // this.topTwentyfive = Math.ceil(this.length / 4);
	    // this.topFifty = Math.ceil(this.length / 2);

      //calculate the number of players in the sections
      var numTop25 = 0;
      var numTop50 = 0;
      var numTop75 = 0;
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

      console.log(this.league);

      var a = 0;
      var b = 0;
      var c = 0;
      a = (0.2 * this.totalPool) / this.topTwentyFive;
      b = (0.3 * this.totalPool) / this.topFifty;
      c = (0.5 * this.totalPool) / this.topSeventyFive;

      this.topPool = a + b + c;
      this.middlePool = b + c;
      this.lowerPool = c;

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
