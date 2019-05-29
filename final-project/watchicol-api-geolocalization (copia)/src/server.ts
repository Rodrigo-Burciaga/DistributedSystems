import * as bodyParser from "body-parser";
import * as express from "express";
import * as mongoose from "mongoose";
import * as multer from "multer";
import "reflect-metadata";
import { createExpressServer, useContainer } from "routing-controllers";
import { containerInversify } from "../inversify.config";
import { authorizationChecker } from "./auth/authorizationChecker";
import { env } from "./env";
import { Logger } from "./lib/logger/Logger";
import { TypeORMLoader } from "./loaders/typeORMLoader";

const logger: Logger = containerInversify.resolve<Logger>(Logger);

class Server {

    private _app: express.Application;
    private _upload: multer;
    private _typeORMLoader: TypeORMLoader;
    private _logger: Logger;

    constructor() {
        useContainer(containerInversify);
        this._logger = containerInversify.resolve<Logger>(Logger);
        this.app = createExpressServer({
            routePrefix: env.app.routePrefix,
            defaultErrorHandler: false,
            classTransformer: true,
            cors: {
                origin: process.env.CORS_ALLOWED_ORIGIN,
                optionsSuccessStatus: 200
            },
            controllers: env.app.dirs.controllers,
            middlewares: env.app.dirs.middlewares,
            authorizationChecker: authorizationChecker()
        });
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.upload = multer();
        this.app.use(this.upload.array());
        this.loadMongoose();
        // this.loadTypeORM();
    }

    private async loadMongoose() {
        mongoose.connect(env.db.connectionUrl, {useNewUrlParser: true});
        mongoose.connection.on("connected", function () {
            logger.info(`Mongoose default connection is open to ${env.db.connectionUrl}`);
        });
        mongoose.connection.on("error", function (err) {
            logger.error(`Mongoose default connection has occured ${err} error`);
        });

        mongoose.connection.on("disconnected", function () {
            logger.warn(`Mongoose default connection is disconnected`);
        });
    }

    // TODO MicroFramework extension
    private async loadTypeORM() {
        await this._typeORMLoader.createConnection();
    }

    get app() {
        return this._app;
    }

    set app(value) {
        this._app = value;
    }

    get upload(): multer {
        return this._upload;
    }

    set upload(value: multer) {
        this._upload = value;
    }

}

export default new Server().app;