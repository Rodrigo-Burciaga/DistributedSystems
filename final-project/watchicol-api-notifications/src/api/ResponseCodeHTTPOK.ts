import { MessagesResponse } from "../util/constants/MessagesResponse";
import { ResponseApi } from "../util/interfaces/ResponseApi";
import { ResponseServiceInterface } from "../util/interfaces/ResponseServiceInterface";
import { GenericResponse } from "./GenericResponse";

export class ResponseCodeHTTPOK extends GenericResponse implements ResponseServiceInterface {

    public fillResponse(httpError?: string, data?: any, extendDescription?: any): ResponseApi {
        this.responseApi.status = MessagesResponse.STATUS_SUCCESS;
        this.fillOptionalData(httpError, data, extendDescription);

        return this.responseApi;
    }

}