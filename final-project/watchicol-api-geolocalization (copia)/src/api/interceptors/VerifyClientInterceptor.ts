import { injectable } from "inversify";
import * as lodash from "lodash";
import { Action, InterceptorInterface, NotFoundError } from "routing-controllers";
import { ResponseVerifyClientKong } from "../../types/interfaces";
import { ConstantsKongService } from "../../util/constants/constantsKongService";
import { ResponseApi } from "../../util/interfaces/ResponseApi";
import { ResponseServiceContext, TypesResponse } from "../services/ResponseServiceContext";
import { GenericInterceptor } from "./GenericInterceptor";

@injectable()
export class VerifyClientInterceptor extends GenericInterceptor implements InterceptorInterface {

    public intercept(action: Action, content: any): any | Promise<any> {
        let response: ResponseVerifyClientKong = JSON.parse(content);
        let responseApi: ResponseApi;
        if (response.total === ConstantsKongService.EXISTS_CLIENT) {
            responseApi = ResponseServiceContext.doResponse(TypesResponse.HTTP_OK, undefined,
                lodash.head(response.data).name);

            return responseApi;
        }
        this._logger.info("Dispatched request", JSON.stringify(responseApi));
        throw new NotFoundError();
    }

}