import { Component, OnInit } from '@angular/core';
import { LeagueService, AlertService } from '../services/index';
import { Router } from '@angular/router';

declare var UIkit: any;

@Component({
  selector: 'app-league-select',
  templateUrl: './league-select.component.html',
  styleUrls: ['./league-select.component.scss']
})
export class LeagueSelectComponent implements OnInit {

  leagues: any[] = [];
  loading: boolean = false;

  constructor(
    private leagueService: LeagueService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.leagueService.getLeagueTypes()
    .subscribe(
      result => {
        this.leagues = result;
        console.log(result);
      }, error => {
        console.log(error);
      }
    );
  }

  selected(leagueType) {
    UIkit.modal.confirm('Please make sure that you are joining the league. Once you join, you will not be able to exit the league. ').then(()=>{
      UIkit.alert('#joiningAlert', {});
      this.loading = true;
      this.leagueService.joinLeague(leagueType).subscribe(
          result => {
            //UIkit.alert('#joiningAlert').close();
            this.loading = false;
            this.router.navigate(['/league/'+result.league_id]);
            console.log(result);
          }, error => {
            //UIkit.alert(UIkit.alert('#joiningAlert')).close();
            this.loading = false;
            this.alertService.error(JSON.parse(error._body).message);
            console.log(error);
          }
        );
    }, function () {
      console.log('Cancel.');
    });
  }

}
