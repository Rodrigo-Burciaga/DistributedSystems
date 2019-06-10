import * as appRoot from "app-root-path";
import * as fs from "fs";
import { injectable } from "inversify";
import * as winston from "winston";
import { format, Logger } from "winston";
import { env } from "../../env";

const options = {
    fileInfo: {
        level: "info",
        filename: `${appRoot}/logs/info.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    fileError: {
        level: "error",
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const printFormatProduction = format.printf((info) => {
    return `[${info.timestamp}] ${info.level}: ${info.message} [${info.args}]`;
});

const printFormatDevelopment = format.printf((info) => {
    return `${info.level}: ${info.message} [${info.args}]`;
});

@injectable()
export class WinstonConfig {

    private _logger: Logger;

    constructor() {
        this.logger = winston.createLogger({
            format: env.node === "development"
                ? winston.format.combine(
                    format.colorize({
                        colors: {
                            info: "blue",
                            warn: "yellow",
                            debug: "magenta",
                            verbose: "cyan"
                        }
                    }),
                    format.simple(),
                    printFormatDevelopment) :
                format.combine(
                    format.timestamp({
                        format: "YYYY-MM-DD HH:mm:ss"
                    }),
                    format.align(),
                    printFormatProduction),
            transports: [
                new winston.transports.Console(options.console)
            ],
            exitOnError: false
        });
        this.createLoggerInProduction();
        this.deleteTransportsInTestMode();
    }

    private createLoggerInProduction(): void {
        if (env.node === "production") {
            const console = new winston.transports.Console();
            this.logger.remove(console);
            if (!fs.existsSync(`${appRoot}/logs/`)) {
                fs.mkdirSync(`${appRoot}/logs/`);
            }
            this.logger.add(new winston.transports.File(options.fileInfo));
            this.logger.add(new winston.transports.File(options.fileError));
        }
    }

    private deleteTransportsInTestMode(): void {
        if (env.isTesting) {
            this.logger.clear();
        }
    }

    get logger(): winston.Logger {
        return this._logger;
    }

    set logger(value: winston.Logger) {
        this._logger = value;
    }
}