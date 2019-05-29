import * as express from "express";
import { inject, injectable } from "inversify";
import * as lodash from "lodash/core";
import { User } from "../api/models/User";
import { ClientService } from "../api/services/ClientService";
import { UserService } from "../api/services/UserService";
import { JWTDecodedInterface } from "../api/util/interfaces/JWTDecodedInterface";
import { Logger } from "../lib/logger/Logger";
import { ConstantsJWT } from "../util/constantsJWT";
import { AuthorizationBasic } from "./AuthorizationBasic";
import { AuthorizationBearer } from "./AuthorizationBearer";
import { AuthorizationInterface } from "./AuthorizationInterface";

export enum TypesAuthentication {
    Basic = "Basic",
    Bearer = "Bearer"
}

@injectable()
export class AuthService {

    public static readonly authStrategies: { [index: string]: AuthorizationInterface } = AuthService.createStrategies();
    private _logger: Logger;
    private _userService: UserService;

    public static createStrategies(): { [index: string]: AuthorizationInterface } {
        let strategies: { [index: string]: AuthorizationInterface } = {};
        strategies[TypesAuthentication.Basic] = new AuthorizationBasic();
        strategies[TypesAuthentication.Bearer] = new AuthorizationBearer();

        return strategies;
    }

    public static authorizeFromType(req: express.Request, ...args: Array<any>): boolean {
        let tokenAuth: string = req.header("Authorization");
        switch (lodash.head(tokenAuth.split(" "))) {
            case ConstantsJWT.TYPES_AUTH.Basic:
                return ClientService.matchBothUserIDImplicitGrant(lodash.head(args), req.body);
            case ConstantsJWT.TYPES_AUTH.Bearer:
                return true;
        }

        return false;
    }

    constructor(@inject(Logger) logger: Logger,
                @inject(UserService) userService: UserService) {
        this._logger = logger;
        this._userService = userService;
    }

    public parseAuthFromHeader(req: express.Request): string {
        let tokenAuthentication: string = req.header("Authorization");
        if (tokenAuthentication) {
            this._logger.info("Token provided by  the client", tokenAuthentication);
            let token: string = lodash.last(tokenAuthentication.split(" "));

            return token;
        }
        this._logger.warn("No there are token provided by client");

        return undefined;
    }

    public findUser(jwtDecoded: JWTDecodedInterface): Promise<User> {
        let user: Promise<User> = this._userService.findOne(parseInt(jwtDecoded.sub));

        return user;
    }

}