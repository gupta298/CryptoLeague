import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { MomentModule } from 'angular2-moment';

import { AuthenticationService, NewsService, UserService, LeagueService, AlertService, PortfolioService } from '../services/index';

import { League } from '../league';

import { User } from '../user';

import * as moment from 'moment';

declare var UIkit: any;
declare var $: any;
declare var browser: any;
declare var Chart: any;
declare var fa: any;

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

  user: User;
  loadingLeague: boolean = true;
	portfolioOpened: boolean = false;
	hideCards: boolean = false;
	waiting: boolean = true;
  leagueID: string;
  league: League = new League();
  timeRemaining: string;
  status: string;
  rank: number;
  leader: string;
  timeRemainingPercent: number;
  leagueStarted: boolean = false;
  endPortfolioID: number = 0;
  currentLeaderboardPortfolioID: string = "portfolio-modal" + this.endPortfolioID;

  	constructor(
      private authService: AuthenticationService,
      private leagueService: LeagueService,
      private portfolioService: PortfolioService,
      private alertService: AlertService,
      private route: ActivatedRoute,
      private router: Router) { }

  	ngOnInit() {
      this.user = this.authService.loadUserFromLocalStorage();
      this.loadLeague();
  		this.portfolioClicked = this.portfolioClicked.bind(this);
  	}

    loadLeague(){
      this.route.params.subscribe(params => {
        //debugger;
        if(!params['id']){
          this.loadingLeague = true;
          this.leagueService.getLeague().subscribe(
            result => this.initLeague(result), error => {
              console.log(error);
              this.alertService.error(JSON.parse(error._body).message);
              this.router.navigate(['/']);
            }
          );
        } else {
          this.leagueID = params['id'];
          this.loadingLeague = true;
          this.leagueService.getLeagueById(this.leagueID).subscribe(
            result => this.initLeague(result), error => {
              console.log(error);
              this.alertService.error(JSON.parse(error._body).message);
              this.router.navigate(['/']);
            }
          );
        }
      });
    }

    initLeague(result: any){
      result.portfolio_ids.sort(function(a, b) {
        return b.portfolio_value - a.portfolio_value;
      });

      for(var i = 0; i < result.portfolio_ids.length; i++) {
        // original ranking
        result.portfolio_ids[i].rank = i + 1;
        //console.log(result.portfolio_ids[i].rank);
      }
      
      let currRank = 1;
      result.portfolio_ids[0].rank = 1;
      for(let i = 1; i < result.portfolio_ids.length; i++){
        if(result.portfolio_ids[i].portfolio_value === result.portfolio_ids[i - 1].portfolio_value){
          result.portfolio_ids[i].rank = currRank;
        } else {
          result.portfolio_ids[i].rank = ++currRank;
        }
      }

      for(var i = 0; i < result.portfolio_ids.length; i++){
        if(result.portfolio_ids[i].username == this.user.username){
          this.rank = result.portfolio_ids[i].rank;
          if(result.portfolio_ids[i].rank == 1){
            this.leader = result.portfolio_ids[i].username;
          }
        }
        else if(result.portfolio_ids[i].rank == 1){
          this.leader = result.portfolio_ids[i].username;
        }
      }

      console.log('Printing here');
      console.log(result);

      this.league.deserialize(result);
      console.log(this.league);

      let timer = Observable.timer(0,1000);
      timer.subscribe(() => this.getTimeRemaining());
      this.loadingLeague = false;
    }

  	portfolioClicked(){
  		console.log("onPortfolioclicked");
  		this.portfolioOpened = !this.portfolioOpened;
  		setTimeout(()=>{
  			this.hideCards = !this.hideCards;
  		}, 500);
  	}

    getTimeRemaining() {
      let startDate: moment.Moment = moment(this.league.start_time);
      let endDate: moment.Moment = moment(this.league.start_time);
      this.status = "starts.";
      //let totaltime = 86400;
      let totaltime = 60 * 60 * 24;
      let currDate: moment.Moment = moment();

      if(startDate.isBefore(currDate)){
        if(!this.leagueStarted){ //reload league if initial countdown is over
          this.leagueStarted = true;
          this.loadLeague();
        }

        //endDate.add(6, 'd');
        endDate.add(1, 'd')
        this.status = "ends.";
        //totaltime = 518400;
        //totaltime = 60 * 4;
        this.timeRemainingPercent = 100 - Math.floor((totaltime - endDate.diff(currDate, 'seconds'))/(totaltime) * 100);
      } else {
        this.timeRemainingPercent = Math.floor((totaltime - endDate.diff(currDate, 'seconds'))/(totaltime) * 100);
      }

      var delta = endDate.diff(currDate, 'seconds');

      if(delta == 0){
        this.loadLeague();
      }

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      var seconds = delta % 60;

      if(this.league.status == 4){
        this.timeRemaining = null;
      } else if(days > 0){
        this.timeRemaining = days + "d " + hours + "h " + minutes + "m " + seconds + "s";//  + "s until the league " + status;
      } else {
        this.timeRemaining = hours + "h " + minutes + "m " + seconds + "s"; //+ "s until the league " + status;
      }
    }
    getUserPortfolio(user_id) {
      var id = "" + this.currentLeaderboardPortfolioID;
      console.log("id "+id);
      UIkit.modal("#portfolio-modal").show();
      this.portfolioService.getPortfolioByLeagueID(this.league.league_id, user_id)
        .subscribe(
          result => {
                console.log(result);
                
                var data = [];
                var labels = [];
                var backgroundColor = [];
                for(var i=0; i<result.holdings.length; i++) {
                  labels[i] = result.holdings[i].coin_symbol;
                  data[i] = Math.round(result.holdings[i].percentage);
                }

                var ctx = document.getElementById(id);
                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: '# of Colors',
                            data: data,
                            backgroundColor: [
                                '#8c9eff',
                                '#ff8a80',
                                '#3d5afe',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',

                            ]
                        }]
                    },
                    options: {
                        
                    }
                });
                this.endPortfolioID = this.endPortfolioID + 1;
                this.currentLeaderboardPortfolioID = "portfolio-modal"+this.endPortfolioID;

          }, error => {
            this.alertService.error(JSON.parse(error._body).message);
            console.log(error);
          });
    }
}
