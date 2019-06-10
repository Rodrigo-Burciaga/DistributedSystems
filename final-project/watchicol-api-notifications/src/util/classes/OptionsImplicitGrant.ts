import { env } from "../../env";
import { ImplicitGrantRequest } from "../../types/interfaces";
import { MethodsHTTP } from "../enums/MethodsHTTP";
import { OptionsHttpRequest } from "./OptionsHttpRequest";

export class OptionsImplicitGrant extends OptionsHttpRequest {

    public body: ImplicitGrantRequest;

    constructor(body: ImplicitGrantRequest, method: MethodsHTTP, url: string, isJson: boolean) {
        super(url, method, isJson);
        this.body = body;
        this.body.provision_key = env.app.provisionKey;
    }

}