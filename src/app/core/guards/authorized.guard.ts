import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../http/auth.service';
import { SessionService } from 'ng-urxnium';
import { map } from 'rxjs/operators';

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
    document.cookie = 'data=soy un dato;'

    return this.sessionService.checkSession().pipe(
      map(resp => {
        if (!resp) {
          this.router.navigate(['auth'])
        }

        return resp;
      })
    );
  }

}
