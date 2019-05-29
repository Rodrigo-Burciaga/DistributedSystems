import { ResponseApi } from "../util/interfaces/ResponseApi";
import { ResponseServiceContext } from "./services/ResponseServiceContext";

export class GenericResponse {

    protected responseApi: ResponseApi;

    constructor() {
        this.responseApi = {
            status: undefined
        };
    }

    protected fillOptionalData(httpError?: string, data?: any, extendDescription?: any): void {
        if (httpError) {
            this.responseApi.error = httpError;
        }
        if (data) {
            this.responseApi.data = data;
        }
        if (extendDescription) {
            if (typeof extendDescription === "object") {
                extendDescription = JSON.stringify(extendDescription);
            }
            ResponseServiceContext.createStringLiteralError(this.responseApi, extendDescription);
        }
    }
}