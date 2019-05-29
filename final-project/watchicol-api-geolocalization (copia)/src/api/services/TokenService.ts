import { inject, injectable } from "inversify";
import * as lodash from "lodash";
import { getCustomRepository } from "typeorm";
import * as uniqid from "uniqid";
import { env } from "../../env";
import { Logger } from "../../lib/logger/Logger";
import { ConstantsJWT } from "../../util/constantsJWT";
import { ConstantsToken } from "../../util/ConstantsToken";
import { TokenDTO } from "../dto/tokenDTO";
import { Token } from "../models/Token";
import { User } from "../models/User";
import { TokenRepository } from "../repositories/TokenRepository";
import { ResponseKongImplicitGrant } from "../util/interfaces/kongInterfaces";

@injectable()
export class TokenService {

    private _logger: Logger;
    private _tokenRepository: TokenRepository;

    constructor(@inject(Logger) logger: Logger) {
        this._logger = logger;
        try {
            this.tokenRepository = getCustomRepository(TokenRepository, env.db.connectionUrl);
        } catch (error) {
            this._logger.error(error, this.constructor.name);
        }
    }

    public findByUser(user: User): Promise<Array<Token>> {
        this._logger.info("finding tokens by user", JSON.stringify(user));
        let tokensByUser: Promise<Array<Token>> = this.tokenRepository.find({
            where: {
                user: user
            },
            relations: ["user"]
        });

        return tokensByUser;
    }

    public getAccessTokenFromResponseKong(responseKongToken: ResponseKongImplicitGrant): string {
        let matchArray: RegExpMatchArray = responseKongToken.redirect_uri.match(ConstantsJWT.REGEX_ACCESS_TOKEN);
        let accessToken: string = lodash.head(matchArray).replace("&", "");

        return accessToken;
    }

    public setTimeForToken(tokenDTO: TokenDTO): void {
        let date: Date = new Date();
        let timeNow: number = Math.round(date.getTime() / ConstantsToken.NUMBER_COVERT_MILISECONDS_TO_SECONDS);
        tokenDTO.entity.issuedAt = timeNow;
        tokenDTO.entity.expiresAt = timeNow + ConstantsJWT.DEFAULT_EXPIRE_TIME;
    }

    public update(tokenDTO: TokenDTO): Promise<Token> {
        this._logger.info("trying to update the Token", JSON.stringify(tokenDTO.entity));
        let tokenUpdated: Promise<Token> = this.tokenRepository.save(tokenDTO.entity);

        return tokenUpdated;
    }

    public create(tokenDTO: TokenDTO): Promise<Token> {
        this._logger.info("creating Token", JSON.stringify(tokenDTO.entity));
        let tokenCreated: Promise<Token> = this.tokenRepository.save(tokenDTO.entity);

        return tokenCreated;
    }

    public generateSignID(authenticatedUserId: string): string {
        let uniqueId: string = uniqid(authenticatedUserId);

        return uniqueId;
    }

    public getTokenfromAccessToken(accessToken: string): string {
        let token: string = lodash.last(accessToken.split("="));

        return token;
    }

    public isTokenExpired(token: Token): boolean {
        let date: Date = new Date();
        let timeNow: number = Math.round(date.getTime() / ConstantsToken.NUMBER_COVERT_MILISECONDS_TO_SECONDS);
        let isExpired: boolean = timeNow > token.expiresAt;

        return isExpired;
    }

    public findByAccessToken(accessToken: string): Promise<Array<Token>> {
        this.logger.info("finding Token by accessToken", accessToken);
        const tokens: Promise<Array<Token>> = this.tokenRepository.find({
            where: {
                accessToken: accessToken
            }
        });

        return tokens;
    }

    // GETTERS AND SETTERS

    get tokenRepository(): TokenRepository {
        return this._tokenRepository;
    }

    set tokenRepository(value: TokenRepository) {
        this._tokenRepository = value;
    }

    get logger(): Logger {
        return this._logger;
    }
}