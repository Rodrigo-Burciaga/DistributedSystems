import { TokenDTO } from "../../../src/api/dto/tokenDTO";
import { Token } from "../../../src/api/models/Token";
import { TokenService } from "../../../src/api/services/TokenService";
import { ResponseKongImplicitGrant } from "../../../src/api/util/interfaces/kongInterfaces";
import { Logger } from "../../../src/lib/logger/Logger";
import { ConstantsToken } from "../../../src/util/ConstantsToken";
import { LogMock } from "../lib/LogMock";

describe("TokenService", () => {
    let tokenService: TokenService;
    let logMock: Logger;
    beforeAll(() => {
        logMock = new LogMock();
        tokenService = new TokenService(logMock);
    });
    describe("getAccessTokenFromResponseKong", () => {
        test("must return the access Token", () => {
            const RESPONSE_KONG: ResponseKongImplicitGrant = {
                redirect_uri: "https://www.netlogistik.com/es/#access_token=9AIBEKyRlfKYm0tZ72XcYDK3O8NdszhI" +
                    "&expires_in=7200&state=state23456&token_type=bearer"
            };
            const ACCESS_TOKEN: string = tokenService.getAccessTokenFromResponseKong(RESPONSE_KONG);
            expect(ACCESS_TOKEN).toEqual("access_token=9AIBEKyRlfKYm0tZ72XcYDK3O8NdszhI");
        });
    });
    describe("getTokenfromAccessToken", () => {
        test("must return only the token from the string access token", () => {
            const TOKEN: string = tokenService
                .getTokenfromAccessToken("access_token=rI27AAmokUweNgyjST60LgY52GEvjXIM");
            expect(TOKEN).toEqual("rI27AAmokUweNgyjST60LgY52GEvjXIM");
        });
    });
    describe("setTimeForToken", () => {
        let tokenDTO: TokenDTO;
        let token: Token;
        beforeAll(() => {
            token = new Token();
            token.accessToken = "8OBOolRhnWMOdcVLVgKm5Azh5fqzQKjl";
            token.issuedAt = parseInt("123");
            token.expiresAt = parseInt("1290");
            token.id = 1;
            tokenDTO = new TokenDTO(token);
        });
        test("must update a token for new time and access token", () => {
            tokenService.setTimeForToken(tokenDTO);
            const TIME_NOW = Math.round(new Date().getTime() / ConstantsToken.NUMBER_COVERT_MILISECONDS_TO_SECONDS);
            expect(tokenDTO.entity.issuedAt).toBeLessThanOrEqual(TIME_NOW);
            expect(tokenDTO.entity.expiresAt).toBeGreaterThan(TIME_NOW);
        });
    });
    describe("generateSignID", () => {
        test("must generate a signID", () => {
            const SIGNID: string = tokenService.generateSignID("1");
            expect(SIGNID).toBeDefined();
        });
    });
});
