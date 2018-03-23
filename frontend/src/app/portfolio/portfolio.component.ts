import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MarketService } from '../services/index';
import { PortfolioService, AuthenticationService } from '../services/index';
import { User } from '../user';

declare var $: any;
declare var browser: any;
declare var DraggablePiechart: any;

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

	@Input() onClickCallback: Function;
	@Input() hideCards: boolean;
	proportions: any[] = [];
	constructor(
		private marketService: MarketService,
		private portfolioService: PortfolioService,
    private authService: AuthenticationService,
	) { }

	 @ViewChild("piechart") piechart: ElementRef; 


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
  isPortfolioValid: boolean = false;
  percentage: number = 100;
  isPieSetup: boolean = false;

  //temporary- remove all this hard-coded stuff
  coins: Array<any> = [];

	ngOnInit() {
		this.user = this.authService.loadUserFromLocalStorage();
		if(this.isPortfolioValid && !this.isPieSetup)
			this.setupPieChart();

		this.marketService.getMarketData()
	      .subscribe(
	        result => {
	          this.coinsArray = result;
	          this.portfolioService.getPortfolio()
							.subscribe(
								result => {
									this.portfolioNewAttribute = {};
									console.log(result);
									for(var i=0; i<result.holdings.length; i++) {
										for(var j=0;j<this.coinsArray.length;j++) {
											if(this.coinsArray[j].symbol == result.holdings[i].coin_symbol) {
												this.portfolioNewAttribute.percentage = parseFloat(result.holdings[i].percentage);
												this.portfolioNewAttribute.name = this.coinsArray[j].name;
												this.portfolioNewAttribute.ticker = result.holdings[i].coin_symbol;
												this.portfolioNewAttribute.price = this.coinsArray[j].price;
												this.portfolioNewAttribute.exp_coins = this.precisionRound(this.portfolioNewAttribute.percentage*1000/this.portfolioNewAttribute.price, 4);
												this.portfolioFieldArray.push(this.portfolioNewAttribute);
												this.portfolioNewAttribute = {};
												break;
											}
										}
									}
									console.log(this.portfolioFieldArray);
									this.checkPortfolioValidity();
								}, error => {
									console.log(error);
								}
							)
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
		this.checkPortfolioValidity();
		setTimeout(()=>{ 
  			if(!this.isPieSetup)
  				this.populatePieChart();
  		}, 1000);
		
	}

	rowInsert() {
		this.portfolioFieldArray.push(this.portfolioNewAttribute);
		this.portfolioNewAttribute = {};
		this.isNewRow = false;
		this.checkPortfolioValidity();
	}

	rowDelete(index) {
		this.portfolioFieldArray.splice(index, 1);
		this.checkPortfolioValidity();
		if(!this.isPieSetup)
			this.populatePieChart();
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
    this.onClickCallback();
  }

  checkPortfolioValidity() {
  	var percent = 0;
  	for(var i=0;i<this.portfolioFieldArray.length;i++) {
  		percent += this.portfolioFieldArray[i].percentage;
  	}
  	if(percent != 100) {
  		this.isPortfolioValid = false;
  	} else {
  		this.isPortfolioValid = true;
  	}
  }

  populatePieChart() {
  	this.proportions = [];
  	this.checkPortfolioValidity();
  	if(this.isPortfolioValid) {
  		for(var i=0;i<this.portfolioFieldArray.length;i++) {
	  		var obj = {
	  			proportion: this.portfolioFieldArray[i].percentage,
	  			format: {
	  				color: this.getRandomColor(),
	  				label: this.portfolioFieldArray[i].ticker,
	  			}
	  		}
	  		this.proportions.push(obj);
	  	}
  	} else {
  		this.proportions = [];
  	}
  	console.log(this.proportions); 		
  	this.setupPieChart();
  }


	setupPieChart() {
		var setup = {
			canvas: (<HTMLElement>this.piechart.nativeElement),
			radius: 0.9,
			collapsing: true,
			proportions: this.proportions,
			drawNode: this.drawNode,
			onchange: this.onPieChartChange,
			dragDisabled: false,
			scope: this
		};

		this.draggablePieChart = new DraggablePiechart(setup);
		this.isPieSetup = true;
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

	onPieChartChange(piechart, that) {
		if(that.isPortfolioValid)	{
			var table = $('#proportions-table');
			var percentages = piechart.getAllSliceSizePercentages();
			console.log("percentages", percentages);
			for(var i=0; i < that.portfolioFieldArray.length; i++) {
				console.log("inside loop")
				that.portfolioFieldArray[i].percentage = percentages[i];
			}
		}
	}

	precisionRound(number, precision) {
  	var factor = Math.pow(10, precision);
  	return Math.round(number * factor) / factor;
	}

	getRandomColor() {
		var colors = ['#81d3f9','#b5ffff','#4ba2c6','#e5ffff','#01579b','#002f6c','#64ffda','#14cba8','#00e676','#00b248','#eeff41','#558b2f','#ff6d00','#ff9e40','#ff6434'];
		var hue = '#'+Math.floor(Math.random()*16777215).toString(16);
		console.log(hue);
		return colors[Math.floor(Math.random() * colors.length)];
	}

}
