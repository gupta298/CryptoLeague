import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';

import { AuthenticationService, UserService } from './services/index';

@Injectable()
export class AuthGuard implements CanActivate {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
      private router: Router,
      private authService: AuthenticationService,
      private userService: UserService
    ) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let token = localStorage.getItem('jwtToken');
  		  if (token && !this.jwtHelper.isTokenExpired(token)) {
          this.userService.getUser()
          .subscribe(
              result => {
                console.log('getUser res', result);

                //update jwt token
                var user = this.jwtHelper.decodeToken(result.jwt);
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('jwtToken', result.jwt);

                
                if(!user.username) {
                  this.router.navigate(['/landing'], { queryParams: { returnUrl: state.url }});
                }

                return true;
              }, error => {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('jwtToken');
                // things went wrong so redirect to login page with the return url
                this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
                console.log(error);
                return false;
              }
          );
          return true;
      	} else {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('jwtToken');

        	// not logged in so redirect to login page with the return url
        	this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        	return false;
        }
    }
}
