import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

	portfolioOpened: boolean = false;
	hideCards: boolean = false;

  	constructor() { }

  	ngOnInit() {
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
