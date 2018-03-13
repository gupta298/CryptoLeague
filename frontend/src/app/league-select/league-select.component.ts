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
    console.log(leagueType);
  }

}
