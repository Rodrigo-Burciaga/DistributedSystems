import { ResponseApi } from "./ResponseApi";

export interface ResponseServiceInterface {
    fillResponse(httpError?: string, data?: any, extendDescription?: any): ResponseApi;
}