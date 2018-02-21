import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments';
import { AuthenticationService } from './authentication.service'
import { User } from '../user';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  constructor(
  	private http: Http,
  	private authService: AuthenticationService
  ) { }

  getUser() {
      return this.http.get(environment.apiUrl+'/api/user/', this.authService.generateJwt()).map((response: Response) => response.json());
  }

  getRankings() {
   	return this.http.get(environment.apiUrl+'/app/all_users',  this.authService.generateJwt()).map((response: Response) => response.json());
  }

}
