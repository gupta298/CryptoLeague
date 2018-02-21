import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments'

import { AuthenticationService } from './authentication.service'

@Injectable()
export class MarketService {

  constructor(
  	private http: Http,
  	private authService: AuthenticationService) { }

  getMarketData() {
      return this.http.get(environment.apiUrl+'/market/', this.authService.generateJwt()).map((response: Response) => response.json());
  }

}
