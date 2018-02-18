import { Component, OnInit } from '@angular/core';
import { User } from '../user';

import { AuthenticationService } from '../services/index'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	user: User;

  	constructor(
  		private authService: AuthenticationService
  		) { }

  	ngOnInit() {
  		this.user = this.authService.loadUserFromLocalStorage();
  	}

}
