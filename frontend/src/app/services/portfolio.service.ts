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

  getPortfolio() {
   	return this.http.get(environment.apiUrl+'/portfolio/',  this.authService.generateJwt()).map((response: Response) => response.json());
  }

  putPortfolio(portfolio) {
   	return this.http.put(environment.apiUrl+'/portfolio/', portfolio, this.authService.generateJwt()).map((response: Response) => response.json());
  }

}
