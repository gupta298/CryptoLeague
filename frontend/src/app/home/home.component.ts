import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments';

declare var UIkit: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	environment: any;

  	constructor() { 
  		this.environment = environment;
  	}

  	ngOnInit() {
  		console.log('env', environment);
  	}
}
