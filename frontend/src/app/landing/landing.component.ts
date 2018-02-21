import { Component, OnInit } from '@angular/core';

declare var UIkit: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {

  constructor() { }

  submitted = false;
 
  onSubmit() { 
  	this.submitted = true;
  	console.log('this.submitted: '+this.submitted); 
  }

  ngOnInit() {
  	
  }

}