import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {


  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userName = AuthService.verifyLogged();
    if (!userName) {
      this.router.navigate(['login'], {
        queryParams: {response_type: 'token', scope: 'email', state: 'ap123', client_id: 'api123'}
      });
    }
    return !!userName;
  }
}
