import { inject, injectable } from "inversify";
import { Connection } from "typeorm";
import { WinstonConfig } from "../lib/logger/winston.config";
import { DatabaseCommonPool } from "../services/dbcp/databaseCommonPool";
import { Response } from "../util/classes/Response";
import { CodeResponse } from "../util/codeResponse";

@injectable()
export class GenericDAO {

    private databaseCommonPool: DatabaseCommonPool;
    private connection: Connection;
    private winstonConfig: WinstonConfig;

    constructor(@inject(WinstonConfig) winstonConfig: WinstonConfig,
                @inject(DatabaseCommonPool) databaseCommonPool: DatabaseCommonPool) {
        this.winstonConfig = winstonConfig;
        this.databaseCommonPool = databaseCommonPool;
    }

    public async save(object: Object): Promise<Response<Object>> {
        let response: Response<Object> = new Response();
        await this.getConnection();
        try {
            const entity = await this.connection.manager.save(object);
            response.result = entity;
            if (entity) {
                this.winstonConfig.logger.info(this.constructor.name, entity);
            }
        } catch (error) {
            response.code = CodeResponse.GENERIC_ERROR;
            this.winstonConfig.logger.error(this.constructor.name, error);
        }

        return Promise.resolve(response);
    }

    public async findById(entity: any, id: object): Promise<Response<Object>> {
        let response: Response<Object> = new Response();
        try {
            await this.getConnection();
            const repo = this.connection.getRepository(entity);
            response.result = await repo.findOne(id);
            if (!response.result) {
                response.code = CodeResponse.GENERIC_ERROR;
            }
        } catch (error) {
            this.winstonConfig.logger.error(this.constructor.name, error);
            response.code = CodeResponse.GENERIC_ERROR;
        }

        return Promise.resolve(response);
    }

    public async remove(objectToRemove: any): Promise<Response<Object>> {
        let response: Response<Object> = new Response();
        await this.getConnection();
        try {
            response.result = await this.connection.manager.remove(objectToRemove);
        } catch (error) {
            this.winstonConfig.logger.error(this.constructor.name, error);
            response.code = CodeResponse.GENERIC_ERROR;
        }
        this.winstonConfig.logger.info(this.constructor.name, response);

        return Promise.resolve(response);
    }

    private async getConnection() {
        this.connection = this.databaseCommonPool.getConnection(process.env.DATABASE_CONNECTION_NAME);
        if (!this.connection) {
            this.connection = await this.databaseCommonPool.createConnection();
        }
    }

}
