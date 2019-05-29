import { inject, injectable } from "inversify";
import { getCustomRepository } from "typeorm";
import { env } from "../../env";
import { Logger } from "../../lib/logger/Logger";
import { UserDTO } from "../dto/userDTO";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

@injectable()
export class UserService {

    private _userRepository: UserRepository;
    private _logger: Logger;

    public static areValidCredentials(userDTO: UserDTO): boolean {
        let validCredentials: boolean = !!(userDTO.entity.userName && userDTO.entity.password);

        return validCredentials;
    }

    constructor(@inject(Logger) logger: Logger) {
        this._logger = logger;
        try {
            this._userRepository = getCustomRepository(UserRepository, env.db.connectionUrl);
        } catch (errorGetRepository) {
            this._logger.error(errorGetRepository, this.constructor.name);
        }
    }

    public authenticateUser(userDTO: UserDTO): Promise<User> {
        this._logger.info("trying to authenticate user with credentials", userDTO.entity.userName,
            userDTO.entity.password, userDTO.entity.mail);
        let user: Promise<User> = this._userRepository.findByNameAndPassword(userDTO);

        return user;
    }

    public findOne(id: number): Promise<User> {
        this._logger.info("finding user with id", id);
        let user: Promise<User> = this.userRepository.findOne(id);

        return user;
    }

    public update(userDTO: UserDTO): Promise<User> {
        this._logger.info("updating", JSON.stringify(userDTO.entity));
        let userUpdated: Promise<User> = this.userRepository.save(userDTO.entity);

        return userUpdated;
    }

    get userRepository(): UserRepository {
        return this._userRepository;
    }

    set userRepository(value: UserRepository) {
        this._userRepository = value;
    }
}