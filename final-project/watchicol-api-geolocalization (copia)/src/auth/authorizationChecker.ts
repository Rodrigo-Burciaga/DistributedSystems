import { Action } from "routing-controllers";
import { containerInversify } from "../../inversify.config";
import { User } from "../api/models/User";
import { JWTService } from "../api/services/JWTService";
import { JWTDecodedInterface } from "../api/util/interfaces/JWTDecodedInterface";
import { AuthService } from "./AuthService";

export function authorizationChecker(): (action: Action, roles: Array<any>) => Promise<boolean> | boolean {

    return async function innerAuthorizationChecker(action: Action, roles: Array<string>): Promise<boolean> {
        let authService = containerInversify.resolve<AuthService>(AuthService);
        let token: string = authService.parseAuthFromHeader(action.request);
        if (token) {
            let jwtService: JWTService = containerInversify.resolve<JWTService>(JWTService);
            let decodedJWT: JWTDecodedInterface = jwtService.verifyJWT(token);
            let user: User = await authService.findUser(decodedJWT);
            if (user) {
                let isAuthorized: boolean = AuthService.authorizeFromType(action.request, decodedJWT);

                return isAuthorized;
            }
        }

        return false;
    };
}