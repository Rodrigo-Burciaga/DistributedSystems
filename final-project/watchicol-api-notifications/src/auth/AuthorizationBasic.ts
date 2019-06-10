import * as express from "express";
import * as lodash from "lodash";
import { ClientService } from "../api/services/ClientService";
import { AuthorizationInterface } from "./AuthorizationInterface";

export class AuthorizationBasic implements AuthorizationInterface {

    public authorize(req: express.Request, ...args: Array<any>): boolean {
        args = lodash.head(args);
        let isAuthorized: boolean = ClientService.matchBothUserIDImplicitGrant(lodash.head(args), req.body);

        return isAuthorized;
    }

}