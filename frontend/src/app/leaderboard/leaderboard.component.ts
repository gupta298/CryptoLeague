import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthenticationService, UserService } from '../services/index'; 


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

	user: User;
	allUsers: any[] = [];

	tmp = [{rank: 1, username: "ritw123", tokens: 1000}, 
					{rank: 2, username: "bobby", tokens: 100},
					{rank: 3, username: "nissu", tokens: 10},
					{rank: 4, username: "utky", tokens: 1}];	

  constructor(
    private authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit() {
  	this.allUsers = this.tmp;
    this.user = this.authService.loadUserFromLocalStorage();
    this.userService.getRankings()
      .subscribe(
        result => {
          //this.allUsers = result;

          for(var i=0; i<result.length; i++) {
            var tmpUser = {
              username : result[i].username,
              rank : i+1,
              tokens : result[i].tokens
            };
            this.allUsers.push(tmpUser);
          } 
          console.log(result);
        }, error => {
          console.log(error);
        }
    );
  }

}
