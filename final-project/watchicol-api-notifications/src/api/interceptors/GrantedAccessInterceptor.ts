import { inject, injectable } from "inversify";
import * as lodash from "lodash";
import { Action, InterceptorInterface, InternalServerError } from "routing-controllers";
import { ImplicitGrantRequest } from "../../types/interfaces";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { TokenDTO } from "../dto/tokenDTO";
import { UserDTO } from "../dto/userDTO";
import { Token } from "../models/Token";
import { User } from "../models/User";
import { ResponseServiceContext, TypesResponse } from "../services/ResponseServiceContext";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserService";
import { ResponseKongImplicitGrant } from "../util/interfaces/kongInterfaces";
import { GenericInterceptor } from "./GenericInterceptor";

@injectable()
export class GrantedAccessInterceptor extends GenericInterceptor implements InterceptorInterface {

    private _tokenService: TokenService;
    private _userService: UserService;

    constructor(@inject(TokenService) tokenService: TokenService,
                @inject(UserService) userService: UserService) {
        super(tokenService.logger);
        this._tokenService = tokenService;
        this._userService = userService;
    }

    public async intercept(action: Action, result: any): Promise<any> {
        let implicitGrantRequest: ImplicitGrantRequest = action.request.body as ImplicitGrantRequest;
        let user: User = new User();
        user.id = parseInt(implicitGrantRequest.authenticated_userid);
        // TODO: by the moment is only accepted that one user only have 1 token
        let tokensByUser: Array<Token> = await this._tokenService.findByUser(user);
        let responseAPI: ResponseApi;
        if (!lodash.isEmpty(tokensByUser.length)) {
            responseAPI = await this.updateTokens(result, tokensByUser, implicitGrantRequest);
        } else {
            responseAPI = await this.saveToken(result, implicitGrantRequest);
        }

        return responseAPI;
    }

    public prepareNotEmptyTokenDTO(responseKongImplicit: ResponseKongImplicitGrant, tokensByUser: Array<Token>):
        TokenDTO {
        let accessToken: string = this._tokenService.getAccessTokenFromResponseKong(responseKongImplicit);
        let token: string = this._tokenService.getTokenfromAccessToken(accessToken);
        this._logger.warn("Access Token Retreived by kong", token);
        let firstToken: Token = lodash.head(tokensByUser);
        firstToken.accessToken = token;
        let tokenDTO: TokenDTO = new TokenDTO(firstToken);

        return tokenDTO;
    }

    public prepareEmptyTokenDTO(responseKongImplicit: ResponseKongImplicitGrant): TokenDTO {
        let accessToken: string = this._tokenService.getAccessTokenFromResponseKong(responseKongImplicit);
        let tokenRaw: string = this._tokenService.getTokenfromAccessToken(accessToken);
        this._logger.warn("Access Token Retreived by kong", tokenRaw);
        let token: Token = new Token();
        token.accessToken = tokenRaw;
        let tokenDTO: TokenDTO = new TokenDTO(token);

        return tokenDTO;
    }

    public async updateTokens(result: any, tokensByUser: Array<Token>, implicitGrantRequest: ImplicitGrantRequest):
        Promise<ResponseApi> {
        let tokenDTO: TokenDTO = this.prepareNotEmptyTokenDTO(result as ResponseKongImplicitGrant, tokensByUser);
        this._tokenService.setTimeForToken(tokenDTO);
        let token: Token = await this._tokenService.update(tokenDTO);
        let userUpdated: User = await this.updateUserSignId(token, implicitGrantRequest);
        let responseApi: ResponseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
            undefined, {signId: userUpdated.signId});

        return responseApi;
    }

    public async saveToken(result: any, implicitGrantRequest: ImplicitGrantRequest): Promise<ResponseApi> {
        let userBrowsed = await this._userService.findOne(parseInt(implicitGrantRequest.authenticated_userid));
        if (userBrowsed) {
            let tokenDTO = this.prepareEmptyTokenDTO(result as ResponseKongImplicitGrant);
            this._tokenService.setTimeForToken(tokenDTO);
            tokenDTO.entity.user = userBrowsed;
            let userUpdated: User = await this.updateUserSignId(tokenDTO.entity, implicitGrantRequest);
            await this._tokenService.create(tokenDTO);
            let responseApi: ResponseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
                undefined, {signId: userUpdated.signId});

            return responseApi;
        }
        throw new InternalServerError("Database Error");
    }

    public updateUserSignId(token: Token, implicitGrant: ImplicitGrantRequest): Promise<User> {
        token.user.signId = this._tokenService.generateSignID(implicitGrant.authenticated_userid);
        this._logger.info("generated signID", token.user.signId, this.constructor.name);
        let userDTO: UserDTO = new UserDTO(token.user);
        let userUpdated: Promise<User> = this._userService.update(userDTO);

        return userUpdated;
    }
}