import { Client, ImplicitGrantRequest, ResponseVerifyClientKong } from "../../types/interfaces";

export class ClientDTO {

    private _entity: Client;
    private _responseClient: ResponseVerifyClientKong;
    private _implicitGrantRequest: ImplicitGrantRequest;

    constructor(entity: Client) {
        this.entity = entity;
    }

    get entity(): Client {
        return this._entity;
    }

    set entity(value: Client) {
        this._entity = value;
    }

    get responseClient(): ResponseVerifyClientKong {
        return this._responseClient;
    }

    set responseClient(value: ResponseVerifyClientKong) {
        this._responseClient = value;
    }

    get implicitGrantRequest(): ImplicitGrantRequest {
        return this._implicitGrantRequest;
    }

    set implicitGrantRequest(value: ImplicitGrantRequest) {
        this._implicitGrantRequest = value;
    }
}