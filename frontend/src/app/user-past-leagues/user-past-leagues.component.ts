import { Component, OnInit, Input } from '@angular/core';

import { User } from '../user';

@Component({
  selector: 'app-user-past-leagues',
  templateUrl: './user-past-leagues.component.html',
  styleUrls: ['./user-past-leagues.component.scss']
})
export class UserPastLeaguesComponent implements OnInit {

	@Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
