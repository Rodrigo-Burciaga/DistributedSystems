import * as express from "express";

export interface AuthorizationInterface {
    authorize(req: express.Request, ...args: Array<any>): boolean;
}