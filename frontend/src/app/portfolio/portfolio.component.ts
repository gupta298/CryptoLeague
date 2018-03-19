import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from '../services/index'; 


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
			{ proportion: 50, format: { color: "#2665da", label: 'Cats' } },
			{ proportion: 50, format: { color: "#6dd020", label: 'Dogs' } }];

	constructor(private marketService: MarketService) { }
	private portfolioFieldArray: Array<any> = [];
  private portfolioNewAttribute: any = {};
  isNewRow: boolean = false;
  coinsArray: Array<any> = [];
  autoComplete: Array<any> = [];
  inSearchBar: boolean = false;

  //temporary- remove all this hard-coded stuff
  coins: Array<any> = [];

	ngOnInit() {
		this.setupPieChart();

		this.coins.push("abcd");
		this.coins.push("akshfvbkj");
		this.coins.push("abcalfdasdd");
		this.coins.push("abcdeasdflklnj");

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
		this.inSearchBar = true;
		//console.log(searchValue);
		this.autoComplete = [];
		for(let i=0;i<this.coinsArray.length;i++) {
			if(this.coinsArray[i].name.toLowerCase().startsWith(searchValue)) {
				this.autoComplete.push(this.coinsArray[i].name);
			}
		}

	}

	clickRowInsert() {
		this.isNewRow = true;
	}

	rowInsert() {
		this.portfolioFieldArray.push(this.portfolioNewAttribute);
		this.portfolioNewAttribute = {};
		this.isNewRow = false;
	}

	rowDelete(index) {
		this.portfolioFieldArray.splice(index, 1);
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

			var newPie = new DraggablePiechart(setup);
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

			var newPie = new DraggablePiechart(setup);
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

		var newPie = new DraggablePiechart(setup);

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
}
