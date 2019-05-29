import { inject, injectable } from "inversify";
import * as lodash from "lodash";
import {
    Authorized,
    BadRequestError,
    Body,
    Get,
    HeaderParam,
    JsonController,
    Param,
    ParamOptions,
    Post,
    UseInterceptor
} from "routing-controllers";
import { EntityFromBody, EntityParamOptions } from "typeorm-routing-controllers-extensions";
import { AuthService } from "../../auth/AuthService";
import { env } from "../../env";
import { ImplicitGrantRequest, ResponseVerifyClientKong } from "../../types/interfaces";
import { ClientDTO } from "../dto/ClientDTO";
import { UserDTO } from "../dto/userDTO";
import { AuthenticateUserInterceptor } from "../interceptors/AuthenticateUserInterceptor";
import { GetSignInterceptor } from "../interceptors/GetSignInterceptor";
import { GrantedAccessInterceptor } from "../interceptors/GrantedAccessInterceptor";
import { VerifyClientInterceptor } from "../interceptors/VerifyClientInterceptor";
import { User } from "../models/User";
import { ClientService } from "../services/ClientService";
import { JWTService } from "../services/JWTService";
import { UserService } from "../services/UserService";
import { JWTDecodedInterface } from "../util/interfaces/JWTDecodedInterface";
import { ResponseKongImplicitGrant } from "../util/interfaces/kongInterfaces";

const optionsController: EntityParamOptions = {
    required: true,
    connection: env.db.connectionUrl
};
const optionsHeader: ParamOptions = {
    required: true
};

@JsonController()
@injectable()
export class OAuthController {

    private _clientService: ClientService;
    private _userService: UserService;
    private _authService: AuthService;
    private _jwtService: JWTService;

    constructor(@inject(ClientService) clientService: ClientService,
                @inject(UserService) userService: UserService,
                @inject(AuthService) authService: AuthService,
                @inject(JWTService) jwtService: JWTService) {
        this._clientService = clientService;
        this._userService = userService;
        this._authService = authService;
        this._jwtService = jwtService;
    }

    // TODO Morgan Logger
    @Get(env.app.routeVerifyClient)
    @UseInterceptor(VerifyClientInterceptor)
    public verifyClient(@Param(env.app.paramVerifyClient) clientId: string): Promise<ResponseVerifyClientKong> {
        let clientDTO: ClientDTO = new ClientDTO({
            client_id: clientId
        });
        let kongClient: Promise<ResponseVerifyClientKong> = this._clientService.getClient(clientDTO);

        return kongClient;
    }

    @Post(env.app.routeAuthUser)
    @UseInterceptor(AuthenticateUserInterceptor)
    public authenticateUser(@EntityFromBody(optionsController) user: User): Promise<User> {
        let userDTO: UserDTO = new UserDTO(user);
        if (UserService.areValidCredentials(userDTO)) {
            let userAuthenticated: Promise<User> = this._userService.authenticateUser(userDTO);

            return userAuthenticated;
        }

        throw new BadRequestError("Bad Credentials Provided");
    }

    @Authorized()
    @Post(env.app.routeGrantedAccess)
    @UseInterceptor(GrantedAccessInterceptor)
    public grantedAccess(@Body() implicitGrantRequest: ImplicitGrantRequest): Promise<ResponseKongImplicitGrant> {
        if (ClientService.verifyOptionsImplicitGrantRequest(implicitGrantRequest)) {
            let clientDTO: ClientDTO = new ClientDTO(undefined);
            clientDTO.implicitGrantRequest = implicitGrantRequest;
            let implicitGrantResponse: Promise<ResponseKongImplicitGrant> =
                this._clientService.getAccessTokenImplicitGrant(clientDTO);

            return implicitGrantResponse;
        }

        throw new BadRequestError("Bad Body Provided");
    }

    @Authorized()
    @Post(env.app.routeGetSign)
    @UseInterceptor(GetSignInterceptor)
    public getSignId(@HeaderParam("Authorization", optionsHeader) token: string): Promise<User> {
        let accessToken: string = lodash.last(token.split(" "));
        let jwtDecoded: JWTDecodedInterface = this._jwtService.verifyJWT(accessToken);
        let user: Promise<User> = this._authService.findUser(jwtDecoded);

        return user;
    }

    @Authorized()
    @Post(env.app.routeVerifySign)
    public verifySignId() {
        throw new Error("coming soon");
    }
}
