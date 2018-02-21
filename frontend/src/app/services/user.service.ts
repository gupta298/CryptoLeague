import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments';
import { AuthenticationService } from './authentication.service'
import { User } from '../user';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {

  user: User;

  constructor(
  	private http: Http,
  	private authService: AuthenticationService
  ) { }

  getUser() {
      return this.http.get(environment.apiUrl+'/api/user/', this.authService.generateJwt()).map((response: Response) => response.json());
  }

  getRankings() {
   	return this.http.post(environment.apiUrl+'/app/all_users', {'page': 1} ,this.authService.generateJwt()).map((response: Response) => response.json());
  }

  isUsernameValid(username) {

  }

  setUsername(username) {
    this.user.username = username;
    return this.http.put(environment.apiUrl+'/app/update_user', {'user': this.user} ,this.authService.generateJwt()).map((response: Response) => response.json());
  }

}
