import { Client } from "../../types/interfaces";
import { MethodsHTTP } from "../enums/MethodsHTTP";
import { OptionsHttpRequest } from "./OptionsHttpRequest";

export class OptionsVerifyClient extends OptionsHttpRequest {

    public qs: Client;

    constructor(qs: Client, method: MethodsHTTP, url: string, isJson: boolean) {
        super(url, method, isJson);
        this.qs = qs;
    }

}