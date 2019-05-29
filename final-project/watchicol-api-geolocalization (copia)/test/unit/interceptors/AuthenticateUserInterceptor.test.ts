import { AuthenticateUserInterceptor } from "../../../src/api/interceptors/AuthenticateUserInterceptor";
import { User } from "../../../src/api/models/User";
import { JWTService } from "../../../src/api/services/JWTService";
import { UserDTO } from "../../../src/api/dto/userDTO";
import { Logger } from "../../../src/lib/logger/Logger";
import { ConstantsJWT } from "../../../src/util/constantsJWT";
import { SignOptions } from "../../../src/util/interfaces/JWTInterfaces";

describe("AuthenticateUserInterceptor", () => {

    let interceptor: AuthenticateUserInterceptor;
    beforeAll(() => {
        interceptor = new AuthenticateUserInterceptor(new JWTService(new Logger()));
    });

    test("generateSignOptions must return a SignOptions object valid to build JWT", () => {
        let user: User = new User();
        user.id = 1;
        const EXPECTED_OPTIONS: SignOptions = {
            algorithm: ConstantsJWT.RS256,
            expiresIn: ConstantsJWT.DEFAULT_EXPIRE_TIME,
            issuer: ConstantsJWT.ISSUER,
            subject: user.id.toString(),
            audience: ""
        };
        const USER_DTO: UserDTO = new UserDTO(user);
        const RESULT_OPTIONS: SignOptions = interceptor.generateSignOptions(USER_DTO);
        expect(RESULT_OPTIONS).toEqual(EXPECTED_OPTIONS);
    });

    test("generateSignPayload method must return expected object to build JWT", () => {
        let user: User = new User();
        user.userName = "userFake";
        const EXPECTED_OBJECT: object = {
            data: user.userName
        };
        const RESPONSE_OBJECT: object = interceptor.generateSignPayload(user);
        expect(RESPONSE_OBJECT).toEqual(EXPECTED_OBJECT);
    });
});