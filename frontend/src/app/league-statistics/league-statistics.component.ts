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
  topTen: number;
  topTwentyfive: number;
  topFifty: number;
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
	    this.length = this.league.portfolio_ids.length;
	    this.topTen = Math.ceil(this.length / 10);
	    this.topTwentyfive = Math.ceil(this.length / 4);
	    this.topFifty = Math.ceil(this.length / 2);
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
