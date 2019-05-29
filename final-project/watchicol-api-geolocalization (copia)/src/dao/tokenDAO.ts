import { inject } from "inversify";
import * as lodash from "lodash/core";
import { Connection } from "typeorm";
import { TokenDTO } from "../api/dto/tokenDTO";
import { Token } from "../api/models/Token";
import { WinstonConfig } from "../lib/logger/winston.config";
import { DatabaseCommonPool } from "../services/dbcp/databaseCommonPool";
import { Response } from "../util/classes/Response";

export class TokenDAO {

    private databaseCommonPool: DatabaseCommonPool;
    private connection: Connection;
    private winstonConfig: WinstonConfig;

    constructor(@inject(WinstonConfig) winstonConfig: WinstonConfig,
                @inject(DatabaseCommonPool) databaseCommonPool: DatabaseCommonPool) {
        this.winstonConfig = winstonConfig;
        this.databaseCommonPool = databaseCommonPool;
    }

    public async findByUserAndAccessToken(tokenDTO: TokenDTO): Promise<Response<TokenDTO>> {
        await this.getConnection();
        let response: Response<TokenDTO> = new Response();
        try {
            let responseToken = await this.connection.getRepository(Token).find({
                where: {
                    access_token: tokenDTO.entity.accessToken,
                    user: tokenDTO.entity.user
                }
            });
            if (responseToken) {
                response.result = new TokenDTO(lodash.head(responseToken) as Token);
            }
        } catch (error) {
            this.winstonConfig.logger.error(this.constructor.name, error);
        }

        return Promise.resolve(response);
    }

    private async getConnection() {
        this.connection = this.databaseCommonPool.getConnection(process.env.DATABASE_CONNECTION_NAME);
        if (!this.connection) {
            this.connection = await this.databaseCommonPool.createConnection();
        }
    }

}