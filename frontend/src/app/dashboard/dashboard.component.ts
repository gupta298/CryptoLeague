import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import { AuthenticationService, NewsService } from '../services/index'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	user: User;
	news: any[] = [];

  	constructor(
  		private authService: AuthenticationService,
  		private newsService: NewsService
  		) { }

  	ngOnInit() {
  		this.user = this.authService.loadUserFromLocalStorage();
  		this.newsService.getNews()
	      .subscribe(
	        result => {
	          this.news = result;
	          console.log(result);
	        }, error => {
	          console.log(error);
	        }
	    );
  	}

}
