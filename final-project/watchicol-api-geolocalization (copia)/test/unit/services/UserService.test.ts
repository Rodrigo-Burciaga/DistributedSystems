import { UserDTO } from "../../../src/api/dto/userDTO";
import { User } from "../../../src/api/models/User";
import { UserService } from "../../../src/api/services/UserService";
import { LogMock } from "../lib/LogMock";
import { RepositoryMock } from "../lib/RepositoryMock";

describe("UserService", () => {
    let userDTO: UserDTO;
    let userService: UserService;
    beforeAll(() => {
        userDTO = new UserDTO(new User());
        userService = new UserService(new LogMock());
    });

    describe("areValidCredentials", () => {
        test("must return true if password and user in entity are defined", () => {
            userDTO.entity.userName = "fakeUser";
            userDTO.entity.password = "fakePass";
            const response: boolean = UserService.areValidCredentials(userDTO);
            expect(response).toBeTruthy();
        });
        test("must return false if either password or userName are undefined",
            () => {
                userDTO.entity.password = undefined;
                const response: boolean = UserService.areValidCredentials(userDTO);
                expect(response).toBeFalsy();
            });
    });

    describe("authenticateUser", () => {
        let repository: RepositoryMock<User>;
        beforeAll(() => {
            repository = new RepositoryMock();
            userService.userRepository = repository as any;
        });
        test("must return a return a user when match credentials", async () => {
            let user: User = new User();
            user.id = 1;
            user.userName = "mockUser";
            user.password = "mockPassword";
            repository.one = user;
            const USER: User = await userService.authenticateUser(userDTO);
            expect(USER.id).toBe(user.id);
            expect(USER.userName).toBe(user.userName);
        });
    });
});