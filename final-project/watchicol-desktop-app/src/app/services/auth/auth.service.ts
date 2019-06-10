import { Injectable } from '@angular/core';
import { User } from '../../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
  }

  public user: User;

  public static verifyLogged() {
    return window.localStorage.getItem('access_token');
  }

  public static logOut() {
    window.localStorage.clear();
  }

  public getLogged(accessToken: string) {
    window.localStorage.setItem('access_token', accessToken);
  }
}
