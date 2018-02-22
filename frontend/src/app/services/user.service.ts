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
      return this.http.get(environment.apiUrl+'/user/', this.authService.generateJwt()).map((response: Response) => response.json());
  }

  getRankings() {
   	return this.http.post(environment.apiUrl+'/all_users', {'page': 1} ,this.authService.generateJwt()).map((response: Response) => response.json());
  }

  isUsernameValid(user: User) {
    return this.http.post(environment.apiUrl+'/validate_user', user.serialize() ,this.authService.generateJwt()).map((response: Response)=> response.json());
  }

  updateUser(user: User) {
    console.log(user.serialize());
    return this.http.put(environment.apiUrl+'/user', user.serialize() ,this.authService.generateJwt()).map((response: Response)=> response.json());
  }

  getCurrentUserRank(user: User) {
    return this.http.post(environment.apiUrl+'/user_rank', user.serialize() ,this.authService.generateJwt()).map((response: Response)=> response.json());
  }

  public convertJsonToFormData(item){
    var formData = new FormData();

    for (var key in item) {
      if(item[key] !== undefined && item[key] !== null
        //Numbers and objects are always allowed, otherwise the length must be greater than 0
        && ((typeof item[key] === "number")
        || (typeof item[key] === "boolean")
        || (typeof item[key] === "object")
        || (typeof item[key] === "string" && item[key].length && item[key].length > 0))) {
          formData.append(key, item[key]);
        } else {
          console.log("Excluding " + key);
        }
    }

    return formData;
  }

}
