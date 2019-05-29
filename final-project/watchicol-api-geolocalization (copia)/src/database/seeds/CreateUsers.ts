import { Connection } from "typeorm";
import { Factory, Seed, times } from "typeorm-seeding";
import { Token } from "../../api/models/Token";
import { User } from "../../api/models/User";

export class CreateUsers implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        let numberOfUsers: number = 10;
        let em = connection.createEntityManager();
        await times(numberOfUsers, async (n) => {
            let token: Token = await factory(Token)().seed();
            let user: User = await factory(User)().make();
            user.tokens = [token];

            return await em.save(user);
        });
    }

}