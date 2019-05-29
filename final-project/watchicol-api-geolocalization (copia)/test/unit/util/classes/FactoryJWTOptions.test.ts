import { FactoryJWTOptions } from "../../../../src/api/util/classes/FactoryJWTOptions";
import { ConstantsJWT } from "../../../../src/util/constantsJWT";
import { SignOptions } from "../../../../src/util/interfaces/JWTInterfaces";

describe("FactoryJWTOptions", () => {
    test("generateSignOptions method must return expected SignOptions object", () => {
        const EXPECTED_RESULT: SignOptions = {
            algorithm: ConstantsJWT.RS256,
            issuer: "My Company",
            expiresIn: ConstantsJWT.DEFAULT_EXPIRE_TIME,
            subject: "User",
            audience: ""
        };
        const SIGN_RESPONSE: SignOptions = FactoryJWTOptions.generateSignOptions("User", undefined,
            "My Company");
        expect(SIGN_RESPONSE).toEqual(EXPECTED_RESULT);
    });
});