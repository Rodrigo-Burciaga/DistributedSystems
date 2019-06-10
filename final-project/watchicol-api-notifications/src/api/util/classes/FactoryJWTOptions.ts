import { ConstantsJWT } from "../../../util/constantsJWT";
import { SignOptions } from "../../../util/interfaces/JWTInterfaces";

export class FactoryJWTOptions {

    public static generateSignOptions(subject: string, audience: string = "", issuer: string = ConstantsJWT.ISSUER):
        SignOptions {
        let signOptions: SignOptions;
        signOptions = {
            subject: subject,
            algorithm: ConstantsJWT.RS256,
            expiresIn: ConstantsJWT.DEFAULT_EXPIRE_TIME,
            issuer: issuer,
            audience: audience
        };

        return signOptions;
    }
}
