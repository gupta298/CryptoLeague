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

  getLeague(leagueID: string) {
  	  return this.http.get(environment.apiUrl+'/league/'+leagueID, this.authService.generateJwt()).map((response: Response) => response.json());
  }

  joinLeague(leagueType: number) {
  	  return this.http.post(environment.apiUrl+'/league/', {"league_type_id": leagueType}, this.authService.generateJwt()).map((response: Response)=> response.json());
  }

}
