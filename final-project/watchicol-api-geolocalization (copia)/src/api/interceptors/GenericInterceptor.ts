import { inject, injectable } from "inversify";
import { Logger } from "../../lib/logger/Logger";

@injectable()
export class GenericInterceptor {

    protected _logger: Logger;

    constructor(@inject(Logger) logger: Logger) {
        this._logger = logger;
    }
}