import { inject, injectable } from "inversify";
import { Connection, createConnection, getConnection } from "typeorm";
import { env } from "../env";
import { toBool, toNumber } from "../lib/env/utils";
import { Logger } from "../lib/logger/Logger";
import { errorNodeProcess } from "../util/constants/nodenvironment";

@injectable()
export class TypeORMLoader {

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
                name: env.db.connectionUrl,
                entities: env.app.dirs.entities,
                options: {
                    encrypt: true
                }
            });
            this.logger.info("Connection created", this.constructor.name);
        } catch (error) {
            this.logger.error(error, this.constructor.name);
            process.exit(errorNodeProcess);
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