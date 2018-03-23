import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from '../services/index';
import { PortfolioService, AuthenticationService } from '../services/index';
import { User } from '../user';

declare var $: any;
declare var DraggablePiechart: any;

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

	@Input() onClickCallback: Function;
	@Input() hideCards: boolean;
	proportions: any[] = [
			{ proportion: 50, format: { color: this.getRandomColor(), label: 'Cats' } },
			{ proportion: 25, format: { color: this.getRandomColor(), label: 'Dogs' } },
			{ proportion: 25, format: { color: this.getRandomColor(), label: 'Billu' } }];

	constructor(
		private marketService: MarketService,
		private portfolioService: PortfolioService,
    private authService: AuthenticationService,
	) { }

	private portfolioFieldArray: Array<any> = [];
  private portfolioNewAttribute: any = {};
  private user: User;
  isNewRow: boolean = false;
  coinsArray: Array<any> = [];
  autoComplete: Array<any> = [];
  inSearchBar: boolean = false;
  addWithSearch: boolean = false;
  captainCoin: String;
  draggablePieChart: any;

  //temporary- remove all this hard-coded stuff
  coins: Array<any> = [];

	ngOnInit() {
		this.user = this.authService.loadUserFromLocalStorage();
		this.setupPieChart();

		this.portfolioNewAttribute.name = "bitcoin";
		this.portfolioNewAttribute.ticker = "btc";
		this.portfolioNewAttribute.color = "blue";
		this.portfolioNewAttribute.exp_coins = 123;
		this.portfolioNewAttribute.percentage = 12;
		this.portfolioFieldArray.push(this.portfolioNewAttribute);
		this.portfolioNewAttribute = {};

		this.portfolioNewAttribute.name = "ether";
		this.portfolioNewAttribute.ticker = "eth";
		this.portfolioNewAttribute.color = "red";
		this.portfolioNewAttribute.exp_coins = 1234;
		this.portfolioNewAttribute.percentage = 42;
		this.portfolioFieldArray.push(this.portfolioNewAttribute);
		this.portfolioNewAttribute = {};

		this.portfolioNewAttribute.name = "litecoin";
		this.portfolioNewAttribute.ticker = "ltc";
		this.portfolioNewAttribute.color = "pink";
		this.portfolioNewAttribute.exp_coins = 321;
		this.portfolioNewAttribute.percentage = 21;
		this.portfolioFieldArray.push(this.portfolioNewAttribute);
		this.portfolioNewAttribute = {};

		this.portfolioService.getPortfolio(this.user.currentLeague_id,this.user.id)
			.subscribe(
				result => {
					//this.portfolioFieldArray = result;
					console.log(result);
				}, error => {
					console.log(error);
				}
			)

		this.marketService.getMarketData()
	      .subscribe(
	        result => {
	          this.coinsArray = result;
	          console.log(result);
	        }, error => {
	          console.log(error);
	        }
	  		);

	      
	}	

	onSearchChange(searchValue : string ) {  
		this.autoComplete = [];
		for(let i=0;i<this.coinsArray.length;i++) {
			if(this.coinsArray[i].name.toLowerCase().startsWith(searchValue.toLowerCase())) {
				this.autoComplete.push(this.coinsArray[i].name);
			}
		}

	}

	addRowFromSearch(name) {
		console.log(name);
		this.isNewRow = false;
		this.addWithSearch = true;
		this.portfolioNewAttribute = {};
		for(var i=0;i<this.coinsArray.length;i++) {
			if(this.coinsArray[i].name == name) {
				console.log("here");
				this.portfolioNewAttribute.name = name;
				this.portfolioNewAttribute.ticker = this.coinsArray[i].symbol;
				this.portfolioNewAttribute.color = "green";
				this.portfolioNewAttribute.price = this.coinsArray[i].price;
				break;
			}
		}
	}

	clickRowInsert() {
		this.addWithSearch = false;
		this.isNewRow = true;
	}

	rowWithSearchInsert() {
		this.portfolioNewAttribute.exp_coins = this.precisionRound(this.portfolioNewAttribute.percentage*1000/this.portfolioNewAttribute.price, 4);
		this.portfolioFieldArray.push(this.portfolioNewAttribute);
		this.portfolioNewAttribute = {};
		this.addWithSearch = false;
	}

	rowInsert() {
		this.portfolioFieldArray.push(this.portfolioNewAttribute);
		this.portfolioNewAttribute = {};
		this.isNewRow = false;
	}

	rowDelete(index) {
		this.portfolioFieldArray.splice(index, 1);
	}

	deleteNewRowWithSearch() {
		this.addWithSearch = false;
		this.portfolioNewAttribute = {};
	}

	deleteNewRow() {
		this.isNewRow = !this.isNewRow;
		this.portfolioNewAttribute = {};
	}

	focusFunction() {
		this.inSearchBar = true;
	} 

	focusOutFunction() {
		this.inSearchBar = false;
	}

	portfolioExpand() {
		if(!this.hideCards){
			var setup = {
				canvas: document.getElementById('piechart'),
				radius: 0.9,
				collapsing: true,
				proportions: this.proportions,
				drawNode: this.drawNode,
				onchange: this.onPieChartChange,
				dragDisabled: false
			};

			this.draggablePieChart = new DraggablePiechart(setup);
		} else {
			var setup = {
				canvas: document.getElementById('piechart'),
				radius: 0.9,
				collapsing: true,
				proportions: this.proportions,
				drawNode: this.hideNode,
				onchange: this.onPieChartChange,
				dragDisabled: true
			};

			this.draggablePieChart = new DraggablePiechart(setup);
		}
    this.onClickCallback();
  }

	setupPieChart() {
		var setup = {
			canvas: document.getElementById('piechart'),
			radius: 0.9,
			collapsing: true,
			proportions: this.proportions,
			drawNode: this.hideNode,
			onchange: this.onPieChartChange,
			dragDisabled: false
		};

		this.draggablePieChart = new DraggablePiechart(setup);

	}

	hideNode(context, piechart, x, y, centerX, centerY, hover) {
		context.save();
		context.translate(centerX, centerY);
		context.fillStyle = '#fefefe';
		context.beginPath();
		context.arc(x, y, 0, 0, Math.PI * 2, true);
		context.fill();
		//context.stroke();
		context.restore();
	}

	drawNode(context, piechart, x, y, centerX, centerY, hover) {
		context.save();
		context.translate(centerX, centerY);
		context.fillStyle = '#fefefe';

		var rad = hover ? 7 : 5;
		context.beginPath();
		context.arc(x, y, rad, 0, Math.PI * 2, true);
		context.fill();
		//context.stroke();
		context.restore();
	}

	onPieChartChange(piechart) {
		var table = $('#proportions-table');
		var percentages = piechart.getAllSliceSizePercentages();
		//console.log("percentages", percentages);

	}

	precisionRound(number, precision) {
  	var factor = Math.pow(10, precision);
  	return Math.round(number * factor) / factor;
	}

	getRandomColor() {
		var hue = '#'+Math.floor(Math.random()*16777215).toString(16);
		console.log(hue);
		return hue;
	}
}
