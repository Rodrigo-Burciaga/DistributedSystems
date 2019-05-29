import { inject, injectable } from "inversify";
import * as lodash from "lodash/core";
import { Connection } from "typeorm";
import { UserDTO } from "../api/dto/userDTO";
import { User } from "../api/models/User";
import { WinstonConfig } from "../lib/logger/winston.config";
import { DatabaseCommonPool } from "../services/dbcp/databaseCommonPool";
import { Response } from "../util/classes/Response";
import { CodeResponse } from "../util/codeResponse";

@injectable()
export class UserDAO {

    private databaseCommonPool: DatabaseCommonPool;
    private connection: Connection;
    private winstonConfig: WinstonConfig;

    constructor(@inject(WinstonConfig) winstonConfig: WinstonConfig,
                @inject(DatabaseCommonPool) databaseCommonPool: DatabaseCommonPool) {
        this.winstonConfig = winstonConfig;
        this.databaseCommonPool = databaseCommonPool;
    }

    public async findByNameAndPassword(userDTO: UserDTO): Promise<Response<User>> {
        let response: Response<User> = new Response();
        let responseUser: User;
        try {
            await this.getConnection();
            responseUser = await this.connection.manager.createQueryBuilder()
                .select()
                .from(User, "user")
                .where("user.userName= :userName", {userName: userDTO.entity.userName})
                .andWhere("user.password =:password", {password: userDTO.entity.password})
                .getRawOne();
            if (!response) {
                response.code = CodeResponse.GENERIC_ERROR;
            }
        } catch (error) {
            response.code = CodeResponse.GENERIC_ERROR;
            this.winstonConfig.logger.error(this.constructor.name + error);
        }
        this.winstonConfig.logger.info(this.constructor.name + JSON.stringify(responseUser));
        response.result = responseUser;

        return Promise.resolve(response);
    }

    public async findBySignId(userDTO: UserDTO): Promise<Response<User>> {
        await this.getConnection();
        const response: Response<User> = new Response();
        let responseUser: Array<User>;
        try {
            responseUser = await this.connection.getRepository(User).find({
                where: {
                    signId: userDTO.entity.signId
                }
            });
            if (!lodash.head(responseUser)) {
                response.code = CodeResponse.GENERIC_ERROR;
            }
        } catch (error) {
            response.code = CodeResponse.GENERIC_ERROR;
            this.winstonConfig.logger.error(error);
        }
        this.winstonConfig.logger.info("Retreived from " + this.constructor.name + " " +
            JSON.stringify(lodash.head(responseUser)));
        response.result = lodash.head(responseUser);

        return Promise.resolve(response);
    }

    private async getConnection() {
        this.connection = this.databaseCommonPool.getConnection(process.env.DATABASE_CONNECTION_NAME);
        if (!this.connection) {
            this.connection = await this.databaseCommonPool.createConnection();
        }
    }

}