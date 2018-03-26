import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { League } from '../league';

import { LeagueService } from '../services';

@Component({
  selector: 'app-league-waiting-overlay',
  templateUrl: './league-waiting-overlay.component.html',
  styleUrls: ['./league-waiting-overlay.component.scss']
})
export class LeagueWaitingOverlayComponent implements OnInit {

	@Input() league: League;

  	constructor(private leagueService: LeagueService) { }

  	ngOnInit() {
      let timer = Observable.timer(0,5000);
      timer.subscribe(() =>{
        console.log("checking for new data");
    		this.leagueService.getLeague().subscribe(
    			result => {
            this.league.deserialize(result);
    				console.log(result);
    			}, error => {
    				console.log(error);
    			}
    		);
      });
  	}



}
