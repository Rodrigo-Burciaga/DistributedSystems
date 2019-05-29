import { VerifyClientInterceptor } from "../../../src/api/interceptors/VerifyClientInterceptor";
import { ResponseVerifyClientKong } from "../../../src/types/interfaces";
import { ResponseApi } from "../../../src/util/interfaces/ResponseApi";
import { LogMock } from "../lib/LogMock";

jest.mock("../../../src/lib/logger/Logger");
describe("VerifyClientInterceptor", () => {
    let interceptor: VerifyClientInterceptor;
    let content: ResponseVerifyClientKong;
    beforeAll(() => {
        interceptor = new VerifyClientInterceptor(new LogMock());
        content = {
            total: 1,
            data: [
                {
                    created_at: 1533320396000,
                    client_id: "ap123",
                    id: "e5761c89-b767-4df3-a3ee-20639be352c1",
                    redirect_uri: [
                        "https://www.netlogistik.com/es/"
                    ],
                    name: "Aplication_1",
                    client_secret: "ap123",
                    consumer_id: "4cd1c5ed-4753-4717-8e67-8fd25be9f9f2"
                }]
        };
    });

    describe("intercept", () => {
        test("must return expected ResponseApi", () => {
            const EXPECTED_RESULT: ResponseApi = {
                status: "Success",
                data: "Aplication_1"
            };
            const RESPONSE: ResponseApi = interceptor.intercept(jest.fn() as any, JSON.stringify(content));
            expect(RESPONSE).toEqual(EXPECTED_RESULT);
        });
        test("must throw an error", () => {
            function throwFunction() {
                content = {
                    total: 0,
                    data: []
                };
                const RESPONSE: ResponseApi = interceptor.intercept(jest.fn() as any, JSON.stringify(content));
            }

            expect(throwFunction).toThrow();
        });
    });
});