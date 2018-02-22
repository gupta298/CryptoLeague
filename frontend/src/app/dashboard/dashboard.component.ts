import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { AuthenticationService, NewsService, UserService } from '../services/index'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	user: User;
	newsArray: any[] = [];
  loadingNews: boolean = false;
  ranking: number;

  	constructor(
  		private authService: AuthenticationService,
  		private newsService: NewsService,
      private userService: UserService
  		) { 
    }

  	ngOnInit() {
  		this.user = this.authService.loadUserFromLocalStorage();
  		this.getNews();

      TimerObservable.create(0, 900000)
      .subscribe(() => {
        this.getNews();
      });

      this.userService.getCurrentUserRank(this.user)
        .subscribe(
          result => {
            this.ranking = result.rank;
          }, error => {
            console.log(error);
          }
      );
  	}

    getNews() {
      console.log("inside getnews");
      this.loadingNews = true;
      this.newsService.getNews()
        .subscribe(
          result => {
            this.newsArray = result;
            this.loadingNews = false;
            console.log(result);
          }, error => {
            this.loadingNews = false;
            console.log(error);
          }
      );
    }
}
