import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/User';
import { AuthService } from '../../services/auth/auth.service';
import { HttpService } from '../../services/http/http.service';
import { ResponseAPIInterface } from '../../util/interfaces/ResponseAPIInterface';
import { QueryParamsService } from '../../services/query-params.service';
import { ParamsVerifyClient } from '../../util/classes/ParamsVerifyClient';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public errorUserName = 'El campo usuario es obligatorio';
  public errorPassword = 'El campo contraseña es obligatorio';
  public error: string;

  constructor(private router: Router,
              private authService: AuthService,
              private httpService: HttpService,
              private queryParamsService: QueryParamsService,
              private activatedRoute: ActivatedRoute) {
    this.user = new User();
    this.user.user = '';
    this.user.password = '';
  }

  ngOnInit() {
  }

  public onSubmit() {
    this.user.user = this.user.user.trim();
    this.user.password = this.user.password.trim();
    this.httpService.authenticateUser(this.user)
      .subscribe((data: ResponseAPIInterface<{ token: string, sub: number }>) => {
        if (data.status !== 'error') {
          console.log(data);
          this.user.id = data.data.sub;
          this.authService.user = this.user;
          this.getAccessToken(data.data.token);
        } else {
          this.error = 'usuario y o contraseña equivocados';
        }
      });

  }

  public logUser(accessToken: string): void {
    this.authService.getLogged(accessToken);
    this.router.navigate(['inicio']);
  }

  public getAccessToken(token: string): void {
    const response: ResponseAPIInterface<ParamsVerifyClient> = this.queryParamsService.getParams(this.activatedRoute);
    this.httpService.getAccessToken(response.data, token).subscribe((data: ResponseAPIInterface<{ access_token: string }>) => {
        if (data.status !== 'error') {
          this.logUser(data.data.access_token);
          console.log(data);
          this.router.navigate(['inicio'], {queryParamsHandling: 'preserve'});
        } else {
          this.mostarError('Hubo un error de conexión intente más tarde');
        }
      }
    );
  }

  public mostarError(error: string): void {
    this.error = error;
  }
}
