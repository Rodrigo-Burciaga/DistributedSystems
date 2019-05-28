import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FeatureCollection } from '../../util/classes/FeatureCollection';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { ResponseAPIInterface } from '../../util/interfaces/ResponseAPIInterface';
import { catchError, timeout } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'default'
  })
};


@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) {
  }

  public postGeoJSON(featureCollection: FeatureCollection): Observable<ResponseAPIInterface<any>> {
    const stringUrl: string = environment.config.urlServer + environment.config.apiGeolocalication +
      environment.config.endpointGeoJSON;
    console.log(stringUrl);
    return this.http.post(stringUrl, featureCollection, httpOptions)
      .pipe(
        timeout(5000),
        catchError(this.handleError('postGeoJSON', {} as any))
      );
  }

  private handleError<T extends ResponseAPIInterface<any>>(operation = 'operation', result: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(`error in ${operation}`, error);
      result.status = 'error';
      result.httpStatusCodeError = error.status;
      result.error = error.name;
      result.errorDescription = error.statusText;
      return of(result as T);
    };
  }
}
