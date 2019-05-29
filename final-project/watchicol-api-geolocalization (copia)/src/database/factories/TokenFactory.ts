import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { Token } from "../../api/models/Token";
import { ConstantsJWT } from "../../util/constantsJWT";
import { ConstantsToken } from "../../util/ConstantsToken";

define(Token, (faker: typeof Faker, settings: { role: string }) => {
    let tokenFake: string = faker.random.uuid();
    let timeNow: number = Math.floor(new Date().getTime() / ConstantsToken.NUMBER_COVERT_MILISECONDS_TO_SECONDS);
    let iat: number = timeNow;
    let exp: number = timeNow + ConstantsJWT.DEFAULT_EXPIRE_TIME;
    let token: Token = new Token();
    token.accessToken = tokenFake;
    token.issuedAt = iat;
    token.expiresAt = exp;

    return token;
});