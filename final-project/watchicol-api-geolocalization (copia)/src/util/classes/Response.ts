import { CodeResponse } from "../codeResponse";
import { CodeHttpStatus } from "../codeResponseHttp";

export class Response<T> {

    private _code: number;
    private _resultados: Array<T>;
    private _result: T;

    constructor() {
        this.code = CodeHttpStatus.OK;
    }

    get code(): number {
        return this._code;
    }

    set code(value: number) {
        this._code = value;
    }

    get resultados(): Array<T> {
        return this._resultados;
    }

    set resultados(value: Array<T>) {
        this._resultados = value;
    }

    get result(): T {
        return this._result;
    }

    set result(value: T) {
        this._result = value;
    }
}