import * as Faker from "faker";
import { define } from "typeorm-seeding";
import { User } from "../../api/models/User";

define(User, (faker: typeof Faker, settings: { roles: Array<string> }) => {
    let mail: string = faker.internet.email();
    let userName: string = faker.internet.userName();
    let password: string = faker.internet.password();
    let user: User = new User();
    user.mail = mail;
    user.userName = userName;
    user.password = password;
    user.signId = faker.random.uuid();

    return user;
});