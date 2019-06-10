import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FeatureCollection } from '../../util/classes/FeatureCollection';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ResponseAPIInterface } from '../../util/interfaces/ResponseAPIInterface';
import { catchError, timeout } from 'rxjs/operators';
import { IGeoJson } from '../../util/interfaces/IGeoJSON';
import { User } from '../../model/User';
import { ParamsVerifyClient } from '../../util/classes/ParamsVerifyClient';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  public postGeoJSON(featureCollection: FeatureCollection): Observable<ResponseAPIInterface<any>> {
    const stringUrl: string = environment.config.urlProxy + environment.config.locationApiGeolocalication +
      environment.config.endpointGeoJSON;
    console.log(stringUrl);
    return this.http.post(stringUrl, featureCollection)
      .pipe(
        timeout(7000),
        catchError(this.handleError('postGeoJSON', {} as any))
      );
  }

  public getIncidenciasControladas(): Observable<ResponseAPIInterface<Array<IGeoJson>>> {
    const url = environment.config.urlProxy + environment.config.locationApiGeolocalication +
      environment.config.endpointIControladas;
    console.log(url);
    return this.http.get(url)
      .pipe(
        timeout(7000),
        catchError(this.handleError('incidenciasControladas', {} as any))
      );
  }

  public getIncidenciasReparadas(): Observable<ResponseAPIInterface<Array<IGeoJson>>> {
    return this.http.get('http://localhost:3000/apiGeoLocalization/incidencias/reparadas')
      .pipe(
        timeout(7000),
        catchError(this.handleError('incidenciasReparasas', {} as any))
      );
  }

  public getTodasIncidencias(): Observable<ResponseAPIInterface<Array<IGeoJson>>> {
    const stringUrl: string = environment.config.urlProxy + environment.config.locationApiGeolocalication +
      environment.config.endpointTodas;
    console.log(stringUrl);
    return this.http.get(stringUrl)
      .pipe(
        timeout(7000),
        catchError(this.handleError('incidencias todas', {} as any))
      );
  }

  public getIncidenciasPorControlar(): Observable<ResponseAPIInterface<Array<IGeoJson>>> {
    const stringUrl: string = environment.config.urlProxy + environment.config.locationApiGeolocalication +
      environment.config.endpointPorControlar;
    console.log(stringUrl);
    return this.http.get(stringUrl)
      .pipe(
        timeout(7000),
        catchError(this.handleError('incidencias por Controlar', {} as any))
      );
  }

  public getAccessToken(body: ParamsVerifyClient, token: string): Observable<ResponseAPIInterface<{ access_token: string }>> {
    const url: string = environment.config.urlProxy + environment.config.locationServiceAuth
      + environment.config.endpointImplicitGrant;
    console.log(url);
    body.authenticated_userid = this.authService.user.id.toString();
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`
      })
    };
    console.log(body);
    return this.http.post(url, body, httpOptions)
      .pipe(
        timeout(7000),
        catchError(this.handleError('get Access Token', {} as any))
      );
  }

  public authenticateUser(user: User): Observable<ResponseAPIInterface<any>> {
    const stringUrl: string = environment.config.urlProxy + environment.config.locationServiceAuth
      + environment.config.endpointAuthUser;
    console.log(stringUrl);
    return this.http.post(stringUrl, user)
      .pipe(
        timeout(7000),
        catchError(this.handleError('authUser', {} as any))
      );
  }

  public nuevaDenunciaAControlar(featureCollection: FeatureCollection): Observable<ResponseAPIInterface<any>> {
    const stringUrl: string = environment.config.urlProxy + environment.config.locationApiGeolocalication +
      environment.config.endpointNAControlar;
    console.log(stringUrl);
    return this.http.post(stringUrl, featureCollection)
      .pipe(
        timeout(7000),
        catchError(this.handleError('nueva Denuncia a Controlar', {} as any))
      );
  }

  private handleError<T extends ResponseAPIInterface<any>>(operation = 'operation', result: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`error in ${operation}`, error);
      result.status = 'error';
      result.httpStatusCodeError = error.status;
      result.error = error.name;
      result.errorDescription = error.statusText;
      if (error.status === 401) {
        this.router.navigate(['login'], {
          queryParams: {response_type: 'token', scope: 'email', state: 'ap123', client_id: 'api123'}
        });
      }
      return of(result as T);
    };
  }

}
