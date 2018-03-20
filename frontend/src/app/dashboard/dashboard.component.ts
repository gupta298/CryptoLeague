  import { Component, OnInit } from '@angular/core';
  import { User } from '../user';
  import { League } from '../league';
  import { Observable } from "rxjs";
  import { TimerObservable } from "rxjs/observable/TimerObservable";

  import { AuthenticationService, NewsService, UserService, LeagueService } from '../services/index'; 

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
    league: League = null;

    	constructor(
    		private authService: AuthenticationService,
    		private newsService: NewsService,
        private userService: UserService,
        private leagueService: LeagueService
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
        if(this.user.currentLeague_id){
          this.leagueService.getLeague(this.user.currentLeague_id)
            .subscribe(
              result => {
                this.league = new League();
                this.league.deserialize(result);
                console.log(this.league);
              }, error => {
                console.log(error);
              }
            );
        }

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
