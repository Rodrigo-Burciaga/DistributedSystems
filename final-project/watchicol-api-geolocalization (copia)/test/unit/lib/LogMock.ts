import { Logger } from "../../../src/lib/logger/Logger";

export class LogMock extends Logger {

    public debugMock = jest.fn();
    public warnMock = jest.fn();
    public infoMock = jest.fn();
    public errorMock = jest.fn();

    public debug(message: string, ...args: Array<any>): void {
        this.debugMock(message, args);
    }

    public error(message: string, ...args: Array<any>): void {
        this.errorMock(message, args);
    }

    public info(message: string, ...args: Array<any>): void {
        this.infoMock(message, args);
    }

    public warn(message: string, ...args: Array<any>): void {
        this.warnMock(message, args);
    }

}