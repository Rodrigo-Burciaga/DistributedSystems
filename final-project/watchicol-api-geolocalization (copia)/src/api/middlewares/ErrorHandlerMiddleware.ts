import * as express from "express";
import { inject, injectable } from "inversify";
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";
import { env } from "../../env";
import { Logger } from "../../lib/logger/Logger";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { ResponseServiceContext, TypesResponse } from "../services/ResponseServiceContext";

@Middleware({type: "after"})
@injectable()
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    private _isProduction: boolean;
    private _logger: Logger;

    constructor(@inject(Logger) logger: Logger) {
        this._isProduction = env.isProduction;
        this._logger = logger;
    }

    public error(error: HttpError, request: express.Request, response: express.Response, next: express.NextFunction) {
        const RESPONSE_API: ResponseApi = ResponseServiceContext.doResponse(
            error.httpCode || TypesResponse.HTTP_INTERNAL_SERVER_ERROR,
            error.name || error.message,
            undefined,
            request.body);
        response.status(error.httpCode || TypesResponse.HTTP_INTERNAL_SERVER_ERROR);
        response.json(RESPONSE_API);

        if (this._isProduction) {
            this._logger.error(error.name, error.message);
        } else {
            this._logger.error(error.name, error.stack);
        }
    }

}
