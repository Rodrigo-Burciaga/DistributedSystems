import { injectable } from "inversify";
import { CodeHttpStatus } from "../../util/codeResponseHttp";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { ResponseServiceInterface } from "../../util/interfaces/ResponseServiceInterface";
import { ResponseCodeBadRequest } from "../ResponseCodeBadRequest";
import { ResponseCodeHTTPOK } from "../ResponseCodeHTTPOK";
import { ResponseCodeHTTPUnavailable } from "../ResponseCodeHTTPUnavailable";
import { ResponseCodeInternalServerError } from "../ResponseCodeInternalServerError";
import { ResponseCodeNotFound } from "../ResponseCodeNotFound";
import { ResponseCodeUnauthorized } from "../ResponseCodeUnauthorized";

export enum TypesResponse {
    HTTP_OK = CodeHttpStatus.OK,
    HTTP_SERVICE_UNAVAILABLE = CodeHttpStatus.SERVICE_UNAVAILABLE,
    HTTP_BAD_REQUEST = CodeHttpStatus.BAD_REQUEST,
    HTTP_INTERNAL_SERVER_ERROR = CodeHttpStatus.INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND = CodeHttpStatus.NOT_FOUND,
    HTTP_UNAUTHORIZED = CodeHttpStatus.UNAUTHORIZED
}

@injectable()
export class ResponseServiceContext {

    public static readonly _strategies: { [type: number]: ResponseServiceInterface } =
        ResponseServiceContext.createStrategies();

    public static createStringLiteralError(responseApi: ResponseApi, extendDescription: any) {
        responseApi.errorDescription = `${responseApi.errorDescription} - parameters: ${extendDescription.toString()}`;
    }

    public static createStrategies(): { [type: number]: ResponseServiceInterface } {
        let strategies: { [type: number]: ResponseServiceInterface } = {};
        strategies[TypesResponse.HTTP_OK] = new ResponseCodeHTTPOK();
        strategies[TypesResponse.HTTP_SERVICE_UNAVAILABLE] = new ResponseCodeHTTPUnavailable();
        strategies[TypesResponse.HTTP_BAD_REQUEST] = new ResponseCodeBadRequest();
        strategies[TypesResponse.HTTP_INTERNAL_SERVER_ERROR] = new ResponseCodeInternalServerError();
        strategies[TypesResponse.HTTP_NOT_FOUND] = new ResponseCodeNotFound();
        strategies[TypesResponse.HTTP_UNAUTHORIZED] = new ResponseCodeUnauthorized();

        return strategies;
    }

    public static doResponse(type: TypesResponse, httpError?: string, data?: any, extendDescription?: any):
        ResponseApi {
        let responseApi: ResponseApi = ResponseServiceContext._strategies[type]
            .fillResponse(httpError, data, extendDescription);

        return responseApi;
    }
}