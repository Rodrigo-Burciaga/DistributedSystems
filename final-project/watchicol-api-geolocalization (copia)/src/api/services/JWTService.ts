import * as appRoot from "app-root-path";
import { Request } from "express";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import * as jwt from "jsonwebtoken";
import * as path from "path";
import { env } from "../../env";
import { Logger } from "../../lib/logger/Logger";
import { ConstantsJWT } from "../../util/constantsJWT";
import { SignOptions } from "../../util/interfaces/JWTInterfaces";
import { JWTDecodedInterface } from "../util/interfaces/JWTDecodedInterface";

@injectable()
export class JWTService {

    /*
    public generateAccessTokenSignId(userDTO: UserDTO): void {
        if (this.privateKey) {
            let chargeToPayload: Payload;
            chargeToPayload = {
                access_token: lodash.head(userDTO.entity.tokens).accessToken
            };
            this.token = undefined;
            this.token = this.generateSign(ConstantsJWT.JWT_ACCESS_TOKEN, ConstantsJWT.SIGN_OPTIONS_GENERAL,
                userDTO.entity.id.toString(), chargeToPayload);
        }
    }

    public getRedirectUri(message: string): string {
        let arraySeparated: Array<string>;
        arraySeparated = message.split(ConstantsJWT.SEPARATOR_REDIRECT_URI);

        return lodash.head(arraySeparated);
    }

    public generateSign(typePayload: string, typeSignOptions: string, subject: string,
                        chargeToPayload: Payload): string {
        const factoryJWT: FactoryJWTOptions = new FactoryJWTOptions();

        return jwt.sign(factoryJWT.generatePayload(typePayload, chargeToPayload), this.privateKey,
            factoryJWT.generateSignOptions(typeSignOptions, subject));
    }

    public getTokenFromHeader(req: Request, header: string): void {
        this.token = req.get(header);
    }

    public decodeToken() {
        this.tokenDecoded = jwt.decode(this.token);
    }

    private getAccessToken(message: string): string {
        let arraySeparated: Array<string>;
        arraySeparated = message.split(ConstantsJWT.SEPARATOR_REDIRECT_URI);
        arraySeparated = arraySeparated[ConstantsJWT.POSITION_1_REDIRECT].split(ConstantsJWT.SEPARATOR_OPTIONS);
        arraySeparated = lodash.head(arraySeparated).split(ConstantsJWT.SEPARATOR_KEYS);

        return arraySeparated[ConstantsJWT.POSITION_1_REDIRECT];
    }

    private getState(message: string): string {
        let arraySeparated: Array<string>;
        arraySeparated = message.split(ConstantsJWT.SEPARATOR_OPTIONS);
        arraySeparated = arraySeparated[ConstantsJWT.POSITION_2_REDIRECT].split(ConstantsJWT.SEPARATOR_KEYS);

        return arraySeparated[ConstantsJWT.POSITION_1_REDIRECT];
    }

    private getTokenType(message: string): string {
        let arraySeparated: Array<string>;
        arraySeparated = message.split(ConstantsJWT.SEPARATOR_OPTIONS);
        arraySeparated = arraySeparated[ConstantsJWT.POSITION_3_REDIRECT].split(ConstantsJWT.SEPARATOR_KEYS);

        return arraySeparated[ConstantsJWT.POSITION_1_REDIRECT];
    }

    // TODO check for static files and pem files

    */
    private _logger: Logger;
    private _privateKey: string;
    private _fs;
    private _publicKey: string;

    constructor(@inject(Logger) logger: Logger, fileSystem = fs) {
        this._logger = logger;
        this._fs = fileSystem;
    }

    public generateToken(payload: object | string, singOptions: SignOptions): string {
        this.readPrivateKey();
        if (this.privateKey) {
            return jwt.sign(payload, this.privateKey, singOptions);
        }
        throw new Error();
    }

    public readPrivateKey(): void {
        if (!this.privateKey) {
            try {
                const PATH_KEYS = path.join(appRoot.toString(), env.app.dirs.privateKey);
                this._privateKey = this._fs.readFileSync(PATH_KEYS, ConstantsJWT.METHODS_FOR_READ.utf8);
            } catch (error) {
                this._logger.error(error, this.constructor.name);
            }
        }
    }

    // TODO implement in other way "the client must provide the public key"
    public readPublicKey(): void {
        if (!this.publicKey) {
            try {
                const PATH_KEYS = path.join(appRoot.toString(), env.app.dirs.publicKey);
                this.publicKey = this._fs.readFileSync(PATH_KEYS, ConstantsJWT.METHODS_FOR_READ.utf8);
            } catch (error) {
                this._logger.error(error, this.constructor.name);
            }
        }
    }

    // TODO send publicKey to Method
    public verifyJWT(token: string, publicKey?: string, verifyOptions?: any): JWTDecodedInterface {
        this.readPublicKey();

        return jwt.verify(token, this.publicKey, verifyOptions);
    }

    get privateKey(): string {
        return this._privateKey;
    }

    set privateKey(value: string) {
        this._privateKey = value;
    }

    get publicKey(): string {
        return this._publicKey;
    }

    set publicKey(value: string) {
        this._publicKey = value;
    }

    get logger(): Logger {
        return this._logger;
    }
}