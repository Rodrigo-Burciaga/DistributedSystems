import * as express from "express";
import { AuthorizationInterface } from "./AuthorizationInterface";

export class AuthorizationBearer implements AuthorizationInterface {

    public authorize(req: express.Request, ...args: Array<any>): boolean {
        return true;
    }
}