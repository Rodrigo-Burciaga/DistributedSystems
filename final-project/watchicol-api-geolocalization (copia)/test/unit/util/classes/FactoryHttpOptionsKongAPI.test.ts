import { ClientDTO } from "../../../../src/api/dto/ClientDTO";
import { env } from "../../../../src/env";
import { ImplicitGrantRequest } from "../../../../src/types/interfaces";
import { ConstantsGeneratorHttpOptions } from "../../../../src/util/classes/constantsGeneratorHttpOptions";
import { FactoryHttpOptionsKongAPI } from "../../../../src/util/classes/FactoryHttpOptionsKongAPI";
import { OptionsHttpRequest } from "../../../../src/util/classes/OptionsHttpRequest";
import { OptionsImplicitGrant } from "../../../../src/util/classes/OptionsImplicitGrant";
import { OptionsVerifyClient } from "../../../../src/util/classes/OptionsVerifyClient";
import { MethodsHTTP } from "../../../../src/util/enums/MethodsHTTP";

describe("Test suite for checking the configuration needed for making API kong request", () => {
    let factoryOptions: FactoryHttpOptionsKongAPI;
    let fakeClient: ClientDTO;
    beforeAll(() => {
        factoryOptions = new FactoryHttpOptionsKongAPI();
        fakeClient = new ClientDTO({
            client_id: "mockClient"
        });
        fakeClient.implicitGrantRequest = {
            client_id: "mockClient",
            scope: "email",
            authenticated_userid: "mockUser",
            state: "randomString",
            provision_key: "key",
            response_type: "token",
            redirect_uri: "uri"
        };
    });

    test("getConfig method must return a valid config to make a request-promise-native for verifyClient " +
        "in API KONG", () => {
        const mockResult: OptionsHttpRequest = new OptionsVerifyClient({
            client_id: "mockClient"
        }, MethodsHTTP.GET, env.app.endpointVerifyClientKong, false);
        const response: OptionsHttpRequest = factoryOptions.getConfig(ConstantsGeneratorHttpOptions
            .VERIFY_CLIENT_OPTIONS, fakeClient);
        expect(response).toEqual(mockResult);
    });

    test("getConfig method must return a valid config to make a request-promise-native for Get Access Token" +
        "in ImplicitGrant flow OAuth2 API kong", () => {
        const body: ImplicitGrantRequest = {
            client_id: "mockClient",
            scope: "email",
            authenticated_userid: "mockUser",
            state: "randomString",
            provision_key: "key",
            response_type: "token",
            redirect_uri: "uri"
        };
        const mockResult: OptionsHttpRequest = new OptionsImplicitGrant(body, MethodsHTTP.POST,
            env.app.endpointGetAccessTokenImplicitGrant, true);
        const response: OptionsHttpRequest = factoryOptions.getConfig(ConstantsGeneratorHttpOptions
            .IMPLICIT_OPTIONS_CONFIG, fakeClient);
        expect(response).toEqual(mockResult);
    });
});