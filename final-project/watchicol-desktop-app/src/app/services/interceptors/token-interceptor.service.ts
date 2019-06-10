import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepting request');
    const accessToken: string = AuthService.verifyLogged();
    if (accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(req).pipe(
      map(event => {
          if (event instanceof HttpResponse) {
            console.log(event.status, '++++++++++++++++++');
            if (event.status === 401) {
              AuthService.logOut();
              this.router.navigate(['login'], {
                queryParams: {response_type: 'token', scope: 'email', state: 'ap123', client_id: 'api123'}
              });
            }
          }
          return event;
        }
      ));
  }
}

export const httpInterceptorProviders = [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}];
