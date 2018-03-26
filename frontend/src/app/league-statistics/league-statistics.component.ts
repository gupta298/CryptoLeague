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
  topTen: number;
  topTwentyfive: number;
  topFifty: number;

  constructor() { }

  ngOnInit() {
    this.length = this.league.portfolio_ids.length;
    this.topTen = Math.ceil(this.length / 10);
    this.topTwentyfive = Math.ceil(this.length / 4);
    this.topFifty = Math.ceil(this.length / 2);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.length = this.league.portfolio_ids.length;
    this.topTen = Math.ceil(this.length / 10);
    this.topTwentyfive = Math.ceil(this.length / 4);
    this.topFifty = Math.ceil(this.length / 2);
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
