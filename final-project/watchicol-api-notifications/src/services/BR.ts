import { inject, injectable } from "inversify";
import { TokenDTO } from "../api/dto/tokenDTO";
import { UserDTO } from "../api/dto/userDTO";
import { User } from "../api/models/User";
import { GenericDAO } from "../dao/genericDAO";
import { UserDAO } from "../dao/userDAO";
import { Response } from "../util/classes/Response";
import { CodeResponse } from "../util/codeResponse";
import { ConstantsToken } from "../util/ConstantsToken";

@injectable()
export class BusinessRules {

    private userDAO: UserDAO;
    private genericDAO: GenericDAO;

    constructor(@inject(UserDAO) userDAO: UserDAO,
                @inject(GenericDAO) genericDAO: GenericDAO) {
        this.userDAO = userDAO;
        this.genericDAO = genericDAO;
    }

    public async persistSignID(userDTO: UserDTO): Promise<Response<UserDTO>> {
        let response: Response<UserDTO> = new Response();
        let responseUser: Response<Object> = await this.genericDAO.findById(User, userDTO.entity.id);
        if (responseUser.code = CodeResponse.OK) {
            response.result = new UserDTO(responseUser.result as User);
            response.result.entity.signId = userDTO.entity.signId;
            responseUser = await this.genericDAO.save(response.result.entity);
            if (responseUser.code === CodeResponse.OK) {
                response.result.entity = responseUser.result as User;
            } else {
                response.code = CodeResponse.GENERIC_ERROR;
            }
        }

        return Promise.resolve(response);
    }

    public async isValidSign(userDTO: UserDTO): Promise<Response<UserDTO>> {
        let responseDTO: Response<UserDTO> = new Response();
        let responseUser: Response<User> = await this.userDAO.findBySignId(userDTO);
        if (responseUser.code === CodeResponse.OK) {
            responseDTO.result = new UserDTO(responseUser.result);

            return Promise.resolve(responseDTO);
        }
        responseDTO.code = CodeResponse.GENERIC_ERROR;

        return responseDTO;
    }

    public isTokenExpired(tokenDTO: TokenDTO): boolean {
        const dateNow = new Date();
        const dateInSeconds = Math.floor(dateNow.getTime() / ConstantsToken.NUMBER_COVERT_MILISECONDS_TO_SECONDS);

        return dateInSeconds > tokenDTO.entity.expiresAt;
    }

}