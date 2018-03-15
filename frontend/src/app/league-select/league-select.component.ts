import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../services/index';
import { Router } from '@angular/router';

declare var UIkit: any;

@Component({
  selector: 'app-league-select',
  templateUrl: './league-select.component.html',
  styleUrls: ['./league-select.component.scss']
})
export class LeagueSelectComponent implements OnInit {

  constructor(
    private leagueService: LeagueService,
    private router: Router) { }

  ngOnInit() {
  }

  selected(leagueType) {
    UIkit.modal.confirm('Please make sure that you are joining the league. Once you join, you will not be able to exit the league. ').then(()=>{
      UIkit.alert('#joiningAlert', {});

      this.leagueService.joinLeague(leagueType).subscribe(
          result => {
            UIkit.alert('#joiningAlert').close();
            this.router.navigate(['/league/'+result.league_id]);
            console.log(result);
          }, error => {
            UIkit.alert(UIkit.alert('#joiningAlert')).close();
            console.log(error);
          } 
        );
    }, function () {
      console.log('Cancel.');
    });
  }

}
