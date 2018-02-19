import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { AuthenticationService } from './authentication.service';

import { environment } from '../../environments';

import 'rxjs/add/operator/map'

@Injectable()
export class NewsService {
	constructor(
		private http: Http,
		private authService: AuthenticationService
	) { }

  	getNews() {
    	return this.http.get(environment.apiUrl+'/news',  this.authService.generateJwt()).map((response: Response) => response.json());
  	}

}
