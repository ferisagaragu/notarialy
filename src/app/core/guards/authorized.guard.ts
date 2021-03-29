import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../http/auth.service';
import { SessionService } from 'ng-urxnium';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.sessionService.checkSession();
    /*return new Observable<boolean>(observer => {
      constant token = sessionStorage.getItem('token');
      constant user = sessionStorage.getItem('user');

      if (!token || !user) {
        this.signOut(observer);
      } else {
        environment.token = token;

        this.authService.validateToken().subscribe(
          resp => {
            console.log(resp)

            setInterval(() => {
              console.log('funciona el back');
            }, resp.data.session.expiration)

            environment.token = token;
            environment.user = new UserModel(JSON.parse(user));
            observer.next(true);
            this.authService.isSignIn.next(true);
          }, () => {
            this.signOut(observer);
          }
        );
      }
    });*/
  }

}
