export interface Client {
    client_id: string;
}

export interface ResponseVerifyClientKong {
    total: number;
    data: Array<DataVerifyClient>;

}

export interface DataVerifyClient {
    created_at: number;
    client_id: string;
    id: string;
    redirect_uri: Array<string>;
    name: string;
    client_secret: string;
    consumer_id: string;
}

export interface ImplicitGrantRequest {
    client_id: string;
    scope: string;
    authenticated_userid: string;
    state: string;
    provision_key?: string;
    response_type?: string;
    redirect_uri?: string;
}

export interface TokenDecoded {
    access_token: string;
    iat: number;
    exp: number;
    sub: string;
    redirect_uri?: string;
    state?: string;
    token_type?: string;
}

export interface Payload {
    redirect_uri?: string;
    access_token?: string;
    state?: string;
    token_type?: string;
}