import { Component, OnInit } from '@angular/core';
declare var UIkit: any;

@Component({
  selector: 'app-league-select',
  templateUrl: './league-select.component.html',
  styleUrls: ['./league-select.component.scss']
})
export class LeagueSelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  selected(leagueType) {
    UIkit.modal.confirm('Please make sure that you are joining the league. Once you join, you will not be able to exit the league. ').then(function() {
      console.log(leagueType);
    }, function () {
      console.log('Cancel.');
    });
  }

}
