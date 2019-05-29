import { injectable } from "inversify";
import { containerInversify } from "../../../inversify.config";
import { TokenDTO } from "../../api/dto/tokenDTO";
import { TokenDAO } from "../../dao/tokenDAO";
import { TokenDecoded } from "../../types/interfaces";
import { Response } from "../../util/classes/Response";
import { CodeResponse } from "../../util/codeResponse";
import { ConstantsToken } from "../../util/ConstantsToken";

@injectable()
export class TokenBusinessRules {

    public async doesAccessTokenExists(tokenDTO: TokenDTO): Promise<boolean> {
        let tokenDAO: TokenDAO = containerInversify.resolve<TokenDAO>(TokenDAO);
        let responseTokenDTO: Response<TokenDTO> = await tokenDAO.findByUserAndAccessToken(tokenDTO);
        const exists: boolean = (responseTokenDTO.code === CodeResponse.OK);

        return Promise.resolve(exists);
    }

    public fillFieldsToken(tokenDTO: TokenDTO, tokenDecoded: TokenDecoded) {
        tokenDTO.entity.accessToken = tokenDecoded.access_token;
        tokenDTO.entity.expiresAt = tokenDecoded.exp;
        tokenDTO.entity.issuedAt = tokenDecoded.iat;
    }

    public isTokenExpired(tokenDTO: TokenDTO): boolean {
        const dateNow = new Date();
        const dateInSeconds = Math.floor(dateNow.getTime() / ConstantsToken.NUMBER_COVERT_MILISECONDS_TO_SECONDS);

        return dateInSeconds > tokenDTO.entity.expiresAt;
    }
}