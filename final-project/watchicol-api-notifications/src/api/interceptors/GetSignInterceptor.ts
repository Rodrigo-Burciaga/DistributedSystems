import { inject, injectable } from "inversify";
import { Action, InterceptorInterface, InternalServerError } from "routing-controllers";
import { AuthService } from "../../auth/AuthService";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { UserDTO } from "../dto/userDTO";
import { User } from "../models/User";
import { JWTService } from "../services/JWTService";
import { ResponseServiceContext, TypesResponse } from "../services/ResponseServiceContext";
import { TokenService } from "../services/TokenService";
import { UserService } from "../services/UserService";
import { GenericInterceptor } from "./GenericInterceptor";

@injectable()
export class GetSignInterceptor extends GenericInterceptor implements InterceptorInterface {

    private _authService: AuthService;
    private _jwtService: JWTService;
    private _tokenService: TokenService;
    private _userService: UserService;

    constructor(@inject(AuthService) authService: AuthService,
                @inject(JWTService) jwtService: JWTService,
                @inject(TokenService) tokenService: TokenService,
                @inject(UserService) userService: UserService) {
        super(jwtService.logger);
        this._authService = authService;
        this._jwtService = jwtService;
        this._tokenService = tokenService;
        this._userService = userService;
    }

    public async intercept(action: Action, result: any): Promise<any> {
        let user: User = result as User;
        if (user) {
            let userDTO: UserDTO = this.prepareUserDTO(user);
            let userUpdated: User = await this._userService.update(userDTO);
            let responseApi: ResponseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
                undefined, {signId: userUpdated.signId});

            return responseApi;
        }

        throw new InternalServerError("Database error");
    }

    public prepareUserDTO(user: User): UserDTO {
        user.signId = this._tokenService.generateSignID(user.id.toString());
        let userDTO: UserDTO = new UserDTO(user);

        return userDTO;
    }
}