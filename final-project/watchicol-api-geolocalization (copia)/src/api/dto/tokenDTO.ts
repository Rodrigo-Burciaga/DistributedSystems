import { Token } from "../models/Token";

export class TokenDTO {

    private _entity: Token;

    constructor(entidad: Token) {
        this.entity = entidad;
    }

    get entity(): Token {
        return this._entity;
    }

    set entity(value: Token) {
        this._entity = value;
    }
}
