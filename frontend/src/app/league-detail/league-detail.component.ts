import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { LeagueService } from '../services/index';

import { League } from '../league';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

	portfolioOpened: boolean = false;
	hideCards: boolean = false;
	waiting: boolean = true;
  leagueID: string;
  league: League;

  	constructor(
      private leagueService: LeagueService,
      private route: ActivatedRoute,
      private router: Router) { }

  	ngOnInit() {
      this.route.params.subscribe(params => {
        if(!params['id'])
          this.router.navigate(['/']);

        this.leagueID = params['id'];

        this.leagueService.getLeague(this.leagueID).subscribe(
          result => {
            let league = new League();
            league.deserialize(result);
            this.league = league;
            console.log(this.league);
          }, error => {
            console.log(error);
            this.router.navigate(['/']);
          } 
        );
      });
  		this.onPortfolioClicked = this.onPortfolioClicked.bind(this);
  	}

  	onPortfolioClicked(){
  		console.log("onPortfolioclicked");
  		this.portfolioOpened = !this.portfolioOpened;
  		setTimeout(()=>{ 
  			this.hideCards = !this.hideCards;
  		}, 1000);
  	}
}
