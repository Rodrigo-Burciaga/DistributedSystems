import { inject, injectable } from "inversify";
import { Connection, createConnection, getConnection } from "typeorm";
import { env } from "../../env";
import { toBool, toNumber } from "../../lib/env/utils";
import { Logger } from "../../lib/logger/Logger";

@injectable()
export class DatabaseCommonPool {

    private logger: Logger;

    constructor(@inject(Logger) logger: Logger) {
        this.logger = logger;
    }

    public async createConnection(): Promise<Connection> {
        let connection: Connection;
        try {
            connection = await createConnection({
                type: env.db.type as any,
                host: env.db.host,
                port: toNumber(env.db.port),
                username: env.db.username,
                password: env.db.password,
                database: env.db.database,
                synchronize: toBool(env.db.synchronize),
                logging: toBool(env.db.logging),
                name: process.env.DATABASE_CONNECTION_NAME,
                entities: env.app.dirs.entities,
                options: {
                    encrypt: true
                }
            });
            this.logger.info("Connection created" + this.constructor.name);
        } catch (error) {
            this.logger.error(this.constructor.name + " " + error);
            throw error;
        }

        return Promise.resolve(connection);
    }

    public getConnection(connectionName: string): Connection {
        let connection: Connection;
        try {
            connection = getConnection(connectionName);
        } catch (error) {
            this.logger.info("No Connection to Database yet " + error);
        }

        return connection;
    }

}