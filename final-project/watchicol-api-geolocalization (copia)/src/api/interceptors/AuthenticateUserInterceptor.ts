import { inject, injectable } from "inversify";
import { Action, InterceptorInterface, NotFoundError } from "routing-controllers";
import { ConstantsJWT } from "../../util/constantsJWT";
import { SignOptions } from "../../util/interfaces/JWTInterfaces";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { UserDTO } from "../dto/userDTO";
import { User } from "../models/User";
import { JWTService } from "../services/JWTService";
import { ResponseServiceContext, TypesResponse } from "../services/ResponseServiceContext";
import { FactoryJWTOptions } from "../util/classes/FactoryJWTOptions";
import { GeneratorJWTInterface } from "../util/interfaces/GeneratorJWTInterface";
import { GenericInterceptor } from "./GenericInterceptor";

@injectable()
export class AuthenticateUserInterceptor extends GenericInterceptor implements InterceptorInterface,
    GeneratorJWTInterface {

    private _jwtService: JWTService;

    constructor(@inject(JWTService) jwtService: JWTService) {
        super(jwtService.logger);
        this._jwtService = jwtService;
    }

    public intercept(action: Action, result: any): any | Promise<any> {
        let userResponse: User = result as User;
        if (userResponse) {
            let userDTO = new UserDTO(userResponse);
            let signOptions: SignOptions = this.generateSignOptions(userDTO);
            let signPayload: object = this.generateSignPayload(userResponse);
            let tokenUserAuthenticated = this._jwtService.generateToken(signPayload, signOptions);
            let responseApi: ResponseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK,
                undefined, {token: tokenUserAuthenticated});

            return responseApi;
        }
        throw new NotFoundError("User was not found");
    }

    public generateSignOptions(dto?: object): SignOptions {
        let userDTO = dto as UserDTO;
        let signOptions: SignOptions = FactoryJWTOptions
            .generateSignOptions(userDTO.entity.id.toString(), undefined, ConstantsJWT.ISSUER);

        return signOptions;
    }

    public generateSignPayload(arg?: object): object | any {
        let user = arg as User;
        let payload: object = {
            data: user.userName
        };

        return payload;
    }

}