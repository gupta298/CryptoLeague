import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

import { User } from '../user';

import { AuthenticationService } from '../services/index'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  	@Input() page: string;
	user: User;

  	constructor(
  		private router: Router,
  		private authService: AuthenticationService) { }

  	ngOnInit() {
  		this.user = this.authService.loadUserFromLocalStorage();
  	}

  	logout() {
  		this.authService.logout();
  		this.router.navigate(['/'], { queryParams: { loggedOut: ''}});
  	}
}
