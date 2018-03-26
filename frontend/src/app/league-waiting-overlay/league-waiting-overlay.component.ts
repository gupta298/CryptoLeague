import { Component, OnInit, Input } from '@angular/core';

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
      setTimeout(()=>{
    		this.leagueService.getLeague().subscribe(
    			result => {
    				console.log(result);
    			}, error => {
    				console.log(error);
    			}
    		);
      }, 5000);
  	}



}
