import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/index'; 

declare var UIkit: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	environment: any;

  inviteCode: string;

	constructor(
    private router: Router,
    private authService: AuthenticationService) { 
		this.environment = environment;
	}

	ngOnInit() {
		if(this.authService.loadUserFromLocalStorage()){
      this.router.navigate(['/dashboard']);
    }

    let inviteCode = localStorage.getItem('inviteCode');
    if(inviteCode) {
      this.inviteCode = inviteCode;
    }
	}

  checkInviteCode(inviteCode: string){
    if(inviteCode == "DEMODAY18"){
      localStorage.setItem('inviteCode', inviteCode);
      return true;
    } else {
      return false;
    }
  }
}
