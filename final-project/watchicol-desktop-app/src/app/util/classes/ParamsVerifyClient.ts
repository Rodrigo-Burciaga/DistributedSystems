export class ParamsVerifyClient {
  public state: string;
  public response_type: string;
  public client_id: string;
  public redirect_uri: string;
  public scope: string;
  public authenticated_userid?: string;

  constructor(parameters: ParamsVerifyClient) {
    this.state = parameters.state;
    this.response_type = parameters.response_type;
    this.client_id = parameters.client_id;
    this.scope = parameters.scope;
    this.redirect_uri = parameters.redirect_uri;
  }

}
