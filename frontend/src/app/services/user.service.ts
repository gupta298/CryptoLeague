import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments'

import { AuthenticationService } from '../services/'

import { User } from '../user';

@Injectable()
export class UserService {

  constructor(
  	private http: Http,
  	private authService: AuthenticationService) { }

  getUser() {
      return this.http.get(environment.apiUrl+'/api/user/', this.authService.generateJwt()).map((response: Response) => response.json());
  }

}
