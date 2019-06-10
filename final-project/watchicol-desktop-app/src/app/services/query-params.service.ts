import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseAPIInterface } from '../util/interfaces/ResponseAPIInterface';
import { ParamsVerifyClient } from '../util/classes/ParamsVerifyClient';

@Injectable({
  providedIn: 'root'
})
export class QueryParamsService {

  constructor() {
  }

  public static checkParamsVerifyClient(response: ResponseAPIInterface<ParamsVerifyClient>): void {
    if (!response.data.scope || !response.data.client_id
      || !response.data.response_type || !response.data.state ||
      !response.data.redirect_uri) {
      response.status = 'error';
    }
  }

  public getParams(activatedRoute: ActivatedRoute): ResponseAPIInterface<ParamsVerifyClient> {
    const response: ResponseAPIInterface<ParamsVerifyClient> = {
      status: 'success',
    };
    activatedRoute.queryParams.subscribe((params: ParamsVerifyClient) => {
      response.data = new ParamsVerifyClient(params);
    });
    QueryParamsService.checkParamsVerifyClient(response);
    return response;
  }
}
