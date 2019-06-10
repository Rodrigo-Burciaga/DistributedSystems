import { ClientDTO } from "../../../src/api/dto/ClientDTO";
import { ClientService } from "../../../src/api/services/ClientService";
import { DataAccessingKongService } from "../../../src/api/services/DataAccessingKongService";
import { ResponseKongImplicitGrant } from "../../../src/api/util/interfaces/kongInterfaces";
import { ImplicitGrantRequest, ResponseVerifyClientKong } from "../../../src/types/interfaces";
import { ConstantsKongService } from "../../../src/util/constants/constantsKongService";
import { LogMock } from "../lib/LogMock";

jest.mock("../../../src/lib/logger/Logger");
jest.mock("../../../src/api/services/DataAccessingKongService");

describe("ClientService", () => {
    let clientService: ClientService;
    let clientDTO: ClientDTO;
    let dataAccessingKongService: DataAccessingKongService;
    beforeAll(() => {
        dataAccessingKongService = new DataAccessingKongService(new LogMock());
        const RESOLVED_VALUE: any = {
            total: 0,
            data: []
        };
        const RESOLVED_VALUE_1: any = {
            total: 1,
            data: [{
                created_at: 123,
                client_id: "mockClient",
                id: "id",
                redirect_uri: ["redirect"],
                name: "App1",
                client_secret: "secret1",
                consumer_id: "mock"
            }]
        };
        const FUNCTION = jest.fn();
        dataAccessingKongService.getClient = FUNCTION;
        FUNCTION.mockResolvedValueOnce(RESOLVED_VALUE_1)
            .mockResolvedValueOnce(RESOLVED_VALUE);
        clientService = new ClientService(dataAccessingKongService);
        clientDTO = new ClientDTO({
            client_id: "mockClient"
        });
    });

    test("getClient method must return a valid data from kong API, with total number clients equal to 1",
        async () => {
            const RESPONSE: ResponseVerifyClientKong = await clientService.getClient(clientDTO);
            expect(RESPONSE.total).toBe(ConstantsKongService.EXISTS_CLIENT);
        });

    test("getClient method must return a valid data from kong API, but with total number of clients equal to 0 ",
        async () => {
            const response: ResponseVerifyClientKong = await clientService.getClient(clientDTO);
            expect(response.total).toEqual(0);
        });

    test("verifyOptionsImplicitGrantRequest method must true when the object is valid with all required" +
        " properties in the interface ImplicitGrantRequest", () => {
        const IMPLICIT_GRANT_OBJECT: ImplicitGrantRequest = {
            authenticated_userid: "123",
            client_id: "ap123",
            scope: "email",
            state: "state23456",
            response_type: "token"
        };
        const RESPONSE: boolean = ClientService.verifyOptionsImplicitGrantRequest(IMPLICIT_GRANT_OBJECT);
        expect(RESPONSE).toBe(true);
    });

    test("verifyOptionsImplicitGrantRequest method must false when the object is not valid with all required" +
        " properties in the interface ImplicitGrantRequest", () => {
        const IMPLICIT_GRANT_OBJECT: ImplicitGrantRequest = {
            client_id: "ap123",
            scope: "email",
            state: "state23456",
            response_type: "token"
        } as ImplicitGrantRequest;
        const RESPONSE: boolean = ClientService.verifyOptionsImplicitGrantRequest(IMPLICIT_GRANT_OBJECT);
        expect(RESPONSE).toBe(false);
    });

    describe("getAccessTokenImplicitGrant", () => {
        beforeAll(() => {
            dataAccessingKongService.getAccessTokenImplicitGrant = jest.fn().mockResolvedValueOnce({
                redirect_uri: "https://www.netlogistik.com/es/#access_token=P5D0VLdd4PUIhKhzHRnbfir4PMfCQuec&" +
                    "expires_in=7200&state=abdcdsr&token_type=beare"
            });
        });
        test("must return a valid object from Kong API", async () => {
            let response: ResponseKongImplicitGrant = await clientService.getAccessTokenImplicitGrant(clientDTO);
            expect(response).toBeDefined();
        });
    });
});
