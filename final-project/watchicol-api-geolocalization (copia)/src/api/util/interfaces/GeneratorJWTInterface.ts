import { SignOptions } from "../../../util/interfaces/JWTInterfaces";

export interface GeneratorJWTInterface {

    generateSignPayload(arg?: object): object | any;

    generateSignOptions(dto?: object): SignOptions;
}