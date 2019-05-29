import { User } from "../models/User";
import { JWTService } from "../services/JWTService";

export class UserDTO {

    private _entity: User;
    private _tokenAuthenticathedUser: JWTService;

    constructor(entity: User) {
        this.entity = entity;
    }

    get tokenAuthenticathedUser(): JWTService {
        return this._tokenAuthenticathedUser;
    }

    set tokenAuthenticathedUser(value: JWTService) {
        this._tokenAuthenticathedUser = value;
    }

    get entity(): User {
        return this._entity;
    }

    set entity(value: User) {
        this._entity = value;
    }

}