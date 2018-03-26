import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange, Input } from '@angular/core';
import { League } from '../league';

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

	length: number;
  totalPool: number;
  topTwentyFive: number;
  topPool: number;
  topFifty: number;
  middlePool: number;
  topSeventyFive: number;
  lowerPool: number;
  buy_in: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  	if(this.league.portfolio_ids){
      this.buy_in = this.league.league_buy_in;
      console.log("chutiya");
      console.log(this.league);
      this.totalPool = this.buy_in * length;
	    this.length = this.league.portfolio_ids.length;
	    // this.topTen = Math.ceil(this.length / 10);
	    // this.topTwentyfive = Math.ceil(this.length / 4);
	    // this.topFifty = Math.ceil(this.length / 2);

      //let numTop25 = 0, numTop50 = 0, numTop75 = 0;
      for(let i = 0; i < this.league.portfolio_ids.length; i++){
        if(this.league.portfolio_ids[i].rank <= 25)
          this.topTwentyFive++;
        if(this.league.portfolio_ids[i].rank <= 50)
          this.topFifty++;
        if(this.league.portfolio_ids[i].rank <= 75)
          this.topSeventyFive++;
      }
      // this.topTwentyFive = numTop25;
      // this.topFifty = numTop50;
      // this.topSeventyFive = numTop75;

      for(let i = 0; i < this.league.portfolio_ids.length; i++){
        if(this.league.portfolio_ids[i].rank <= 25) {
          this.topPool += (0.2 * this.totalPool) / this.topTwentyFive;
        }
        if(this.league.portfolio_ids[i].rank <= 50) {
          this.middlePool += (0.3 * this.totalPool) / this.topFifty;
        }
        if(this.league.portfolio_ids[i].rank <= 75) {
          this.lowerPool += (0.5 * this.totalPool) / this.topSeventyFive;
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
}
