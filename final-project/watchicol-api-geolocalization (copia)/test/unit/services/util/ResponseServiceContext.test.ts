import { ResponseServiceContext, TypesResponse } from "../../../../src/api/services/ResponseServiceContext";
import { MessagesResponse } from "../../../../src/util/constants/MessagesResponse";
import { ResponseApi } from "../../../../src/util/interfaces/ResponseApi";

describe("ResponseServiceContext", () => {
    describe("doResponse", () => {
        let expectedResponseApi: ResponseApi;
        beforeEach(() => {
            expectedResponseApi = {
                status: undefined
            };
        });
        test("must return an expected ResponseApi when code 200", () => {
            expectedResponseApi.status = MessagesResponse.STATUS_SUCCESS;
            expectedResponseApi.data = "all is ok";
            const RESPONSE_API: ResponseApi = ResponseServiceContext
                .doResponse(TypesResponse.HTTP_OK, undefined, "all is ok");
            expect(RESPONSE_API).toEqual(expectedResponseApi);
        });
        test("must return an expected ResponseApi when code 503", () => {
            expectedResponseApi.status = MessagesResponse.STATUS_ERROR;
            expectedResponseApi.errorDescription = MessagesResponse.SERVICE_UNAVAILABLE;
            const RESPONSE_API: ResponseApi = ResponseServiceContext
                .doResponse(TypesResponse.HTTP_SERVICE_UNAVAILABLE, undefined);
            expect(RESPONSE_API).toEqual(expectedResponseApi);
        });
        test("must return an expected ResponseApi when code is 400", () => {
            expectedResponseApi.status = MessagesResponse.STATUS_ERROR;
            expectedResponseApi.errorDescription = MessagesResponse.BAD_REQUEST;
            const RESPONSE_API: ResponseApi = ResponseServiceContext
                .doResponse(TypesResponse.HTTP_BAD_REQUEST, undefined);
            expect(RESPONSE_API).toEqual(expectedResponseApi);
        });
        test("must return an expected ResponseApi when code is 500", () => {
            expectedResponseApi.status = MessagesResponse.STATUS_ERROR;
            expectedResponseApi.errorDescription = MessagesResponse.INTERNAL_SERVER_ERROR;
            const RESPONSE_API: ResponseApi = ResponseServiceContext
                .doResponse(TypesResponse.HTTP_INTERNAL_SERVER_ERROR, undefined);
            expect(RESPONSE_API).toEqual(expectedResponseApi);
        });
        test("must return an expected ResponseApi when code is 404", () => {
            expectedResponseApi.status = MessagesResponse.STATUS_ERROR;
            expectedResponseApi.errorDescription = MessagesResponse.NOT_FOUND;
            const RESPONSE_API: ResponseApi = ResponseServiceContext
                .doResponse(TypesResponse.HTTP_NOT_FOUND, undefined);
            expect(RESPONSE_API).toEqual(expectedResponseApi);
        });
    });
});