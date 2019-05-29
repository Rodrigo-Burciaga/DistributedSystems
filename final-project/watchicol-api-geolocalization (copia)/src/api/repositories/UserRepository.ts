import { EntityRepository, Repository } from "typeorm";
import { UserDTO } from "../dto/userDTO";
import { User } from "../models/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public findByNameAndPassword(userDTO: UserDTO): Promise<User> {
        return this.createQueryBuilder("user")
            .select()
            .where("user.userName = :userName", {userName: userDTO.entity.userName})
            .andWhere("user.password = :password", {password: userDTO.entity.password})
            .getOne();
    }
}