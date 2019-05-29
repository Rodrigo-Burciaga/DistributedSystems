import { MethodsHTTP } from "../enums/MethodsHTTP";

export class OptionsHttpRequest {

    public url: string;
    public method: MethodsHTTP;
    public json: boolean;

    constructor(url: string, method: MethodsHTTP, json: boolean) {
        this.url = url;
        this.method = method;
        this.json = json;
    }

}