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

	@Input() clickCallback: Function;
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
  chartCount: number = 0;
  portfolioObject: any = {};
  showSubmitPopup: boolean = false;
  submitMessage: String = "validating portfolio....";

  //temporary- remove all this hard-coded stuff
  coins: Array<any> = [];

	ngOnInit() {
											
		this.marketService.getMarketData()
	      .subscribe(
	        result => {
	          this.coinsArray = result;
	          this.portfolioService.getPortfolio()
							.subscribe(
								result => {
									this.portfolioNewAttribute = {};
									this.portfolioObject = result;
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
									this.user = this.authService.loadUserFromLocalStorage();
									if(this.isPortfolioValid && !this.isPieSetup)
										setTimeout(()=>{ 
						  			if(!this.isPieSetup)
						  				this.populatePieChart();
						  		}, 1000);

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
				//console.log("here");
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

	percentUp(i) {
		//debugger;
		if(i>0) {
			if(this.portfolioFieldArray[i].percentage < 100 && this.portfolioFieldArray[i-1].percentage > 0){
				this.portfolioFieldArray[i].percentage = this.portfolioFieldArray[i].percentage+1;
				//this.portfolioFieldArray[i].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i].percentage).toFixed(0));

				this.portfolioFieldArray[i-1].percentage = this.portfolioFieldArray[i-1].percentage-1;
				//this.portfolioFieldArray[i-1].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i-1].percentage).toFixed(0));
			}
		} else if(this.portfolioFieldArray[i].percentage < 100 && this.portfolioFieldArray[i+1].percentage > 0){
			if(this.portfolioFieldArray[i].percentage < 100){
				this.portfolioFieldArray[i].percentage = this.portfolioFieldArray[i].percentage+1;
				//this.portfolioFieldArray[i].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i].percentage).toFixed(0));

				this.portfolioFieldArray[i+1].percentage = this.portfolioFieldArray[i+1].percentage-1;
				//this.portfolioFieldArray[i+1].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i+1].percentage).toFixed(0));
			}
		}
		this.checkPortfolioValidity();
		setTimeout(()=>{ 
  			if(!this.isPieSetup)
  				this.populatePieChart();
  		}, 1000);
		console.log(this.portfolioFieldArray);
	}
	percentDown(i) {
		if(i>0) {
			if(this.portfolioFieldArray[i].percentage < 100 && this.portfolioFieldArray[i-1].percentage > 0){
				this.portfolioFieldArray[i].percentage = this.portfolioFieldArray[i].percentage-1;
				//this.portfolioFieldArray[i].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i].percentage).toFixed(0));

				this.portfolioFieldArray[i-1].percentage = this.portfolioFieldArray[i-1].percentage+1;
				//this.portfolioFieldArray[i-1].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i-1].percentage).toFixed(0));
			}
		} else if(this.portfolioFieldArray[i].percentage < 100 && this.portfolioFieldArray[i+1].percentage > 0){
			if(this.portfolioFieldArray[i].percentage < 100){
				this.portfolioFieldArray[i].percentage = this.portfolioFieldArray[i].percentage-1;
				//this.portfolioFieldArray[i].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i].percentage).toFixed(0));

				this.portfolioFieldArray[i+1].percentage = this.portfolioFieldArray[i+1].percentage+1;
				//this.portfolioFieldArray[i+1].percentage = Number(Number.parseFloat(this.portfolioFieldArray[i+1].percentage).toFixed(0));
			}
		}
		this.checkPortfolioValidity();
		setTimeout(()=>{ 
  			if(!this.isPieSetup)
  				this.populatePieChart();
  		}, 1000);
		console.log(this.portfolioFieldArray);
	}

	focusFunction() {
		this.inSearchBar = true;
	}

	focusOutFunction() {
		this.inSearchBar = false;
	}

	portfolioExpand() {
    this.clickCallback();
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

  submitPortfolio(form) {
  	console.log("inside submit portfolio");
  	//this.showSubmitPopup = false;
  	var percent = 0;
  	for(var i=0;i<this.portfolioFieldArray.length; i++) {
  		percent += this.portfolioFieldArray[i].percentage;
  	}
  	
  		var holdings = [];
  		for(var i=0;i<this.portfolioFieldArray.length; i++) {
	  		var obj = {
	  			percentage: this.portfolioFieldArray[i].percentage,
	  			coin_symbol: this.portfolioFieldArray[i].ticker
	  		}
	  		holdings.push(obj);
	  	}
	  	var body = {
	  		_id: this.portfolioObject._id,
	  		holdings: holdings,
	  		captain_coin: this.captainCoin
	  	}
	  	console.log("before request");
	  	this.portfolioService.putPortfolio(body)
				.subscribe(
					result => {
						console.log(result);
						this.showSubmitPopup = true;
						this.submitMessage = result.message;
						if(result.message == "success") {
							
						}

					}, error => {
						console.log(error);
					}
				)
  	
  }

  submitPopupClick() {
  	this.showSubmitPopup = false;
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
		this.chartCount++;
		var setup = {
			canvas: (<HTMLElement>this.piechart.nativeElement),
			radius: 0.9,
			collapsing: true,
			proportions: this.proportions,
			drawNode: this.drawNode,
			onchange: this.onPieChartChange,
			dragDisabled: false,
			scope: this,
			count: this.chartCount
		};
		if(this.chartCount > 1) {
			this.draggablePieChart.context.clearRect(0, 0, this.draggablePieChart.canvas.width, this.draggablePieChart.canvas.height);
			delete this.draggablePieChart;
		}
		this.draggablePieChart = new DraggablePiechart(setup);
		//this.isPieSetup = true;
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
			this.proportions = that.proportions;
			var table = $('#proportions-table');
			var percentages = piechart.getAllSliceSizePercentages();
			console.log("percentages", percentages);
			for(var i=0; i < that.portfolioFieldArray.length; i++) {
				console.log("inside loop")
				that.portfolioFieldArray[i].percentage = percentages[i];
			}
			//generateDataFromProportions(that.proportions);
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
