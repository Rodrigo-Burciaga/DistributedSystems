import { inject, injectable } from "inversify";
import * as winston from "winston";
import { LoggerInterface } from "./LoggerInterface";
import { WinstonConfig } from "./winston.config";

@injectable()
export class Logger implements LoggerInterface {

    private logger: winston.Logger;

    constructor(@inject(WinstonConfig) winstonConfig?: WinstonConfig) {
        if (winstonConfig) {
            this.logger = winstonConfig.logger;
        }
    }

    public debug(message: string, ...args: Array<any>): void {
        this.logger.debug(message, {
            args: args
        });
    }

    public error(message: string, ...args: Array<any>): void {
        this.logger.error(message, {
            args: args
        });
    }

    public info(message: string, ...args: Array<any>): void {
        this.logger.info(message, {
            args: args
        });
    }

    public warn(message: string, ...args: Array<any>): void {
        this.logger.warn(message, {
            args: args
        });
    }

}