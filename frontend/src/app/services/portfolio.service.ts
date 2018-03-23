import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class PortfolioService {

  constructor(
  	private http: Http,
		private authService: AuthenticationService
	) { }

  getPortfolio(leagueID: String, userID: number) {
   	return this.http.get(environment.apiUrl+'/portfolio/'+leagueID+'/'+userID,  this.authService.generateJwt()).map((response: Response) => response.json());
  }

}
