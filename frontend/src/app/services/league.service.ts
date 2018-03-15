import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments'

import { AuthenticationService } from './authentication.service'

@Injectable()
export class LeagueService {

  constructor(
  	private http: Http,
  	private authService: AuthenticationService) { }

  getLeagueTypes() {
      return this.http.get(environment.apiUrl+'/league_types/', this.authService.generateJwt()).map((response: Response) => response.json());
  }

  getLeague() {
  	  return this.http.get(environment.apiUrl+'/league/', this.authService.generateJwt()).map((response: Response) => response.json());
  }

  joinLeague(leagueType: number) {
  	  return this.http.put(environment.apiUrl+'/user', {"league_type_id": leagueType}, this.authService.generateJwt()).map((response: Response)=> response.json());
  }

}
