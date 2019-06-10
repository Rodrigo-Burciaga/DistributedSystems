import { Request } from "express";
import { UserService } from "../../../src/api/services/UserService";
import { AuthService } from "../../../src/auth/AuthService";
import { Logger } from "../../../src/lib/logger/Logger";
import { LogMock } from "../lib/LogMock";

describe("AuthService", () => {
    let authService: AuthService;
    let logMock: Logger;
    let userService: UserService;
    beforeAll(() => {
        logMock = new LogMock();
        userService = new UserService(new LogMock());
        authService = new AuthService(logMock, userService);
    });
    describe("parseAuthFromHeader", () => {
        test("must return a string when the header contains the token well formed", () => {
            const REQ: Request = {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                    .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
                    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
                },
                header: function (name) {
                    return this.headers[name];
                },
            };
            const TOKEN: string = authService.parseAuthFromHeader(REQ);
            expect(TOKEN).toBeDefined();
        });
        test("must return a undefined when the header contains the token bad formed", () => {
            const REQ: Request = {
                headers: {
                    Authorization1: `Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
                    .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
                    SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
                },
                header: function (name) {
                    return this.headers[name];
                },
            };
            const TOKEN: string = authService.parseAuthFromHeader(REQ);
            expect(TOKEN).toBeUndefined();
        });
    });
});