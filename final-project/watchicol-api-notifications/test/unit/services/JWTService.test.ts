import * as jwt from "jsonwebtoken";
import { JWTService } from "../../../src/api/services/JWTService";
import { SignOptions } from "../../../src/util/interfaces/JWTInterfaces";
import { LogMock } from "../lib/LogMock";

jest.mock("jsonwebtoken");

describe("JWTService", () => {
    let jwtService: JWTService;
    let mockFS;
    let logMock: LogMock;
    const TEST_DATA: Buffer = Buffer.from("This is the data obteined from the key");
    beforeAll(() => {
        const RETURN_DATA: () => Buffer = () => TEST_DATA;
        const THROW_ERROR: () => any = () => {
            throw new Error("fatal reading file");
        };
        let mockFunction = jest.fn()
            .mockImplementationOnce(RETURN_DATA)
            .mockImplementationOnce(THROW_ERROR)
            .mockImplementationOnce(RETURN_DATA)
            .mockImplementationOnce(RETURN_DATA)
            .mockImplementationOnce(THROW_ERROR);
        mockFS = {
            readFileSync: mockFunction
        };
        logMock = new LogMock();
        jwtService = new JWTService(logMock, mockFS);

    });

    test("readPrivateKey method  must read the private key", () => {
        jwtService.readPrivateKey();
        const KEY: string = jwtService.privateKey;
        expect(KEY).toEqual(TEST_DATA);
    });

    test("readPrivateKey method  must throw an error if I/O exception", () => {
        jwtService = new JWTService(logMock, mockFS);
        jwtService.readPrivateKey();
        expect(logMock.errorMock).toHaveBeenCalled();
    });

    test("generateToken method must return a string with a valid token if privateKey is defined", () => {
        jwtService.readPrivateKey();
        const TOKEN_EXPECTED: string = "tokenFake1234567";
        jwt.sign = jest.fn().mockReturnValueOnce("tokenFake1234567");
        const TOKEN: string = jwtService.generateToken({}, {} as SignOptions);
        expect(TOKEN).toEqual(TOKEN_EXPECTED);
    });

    test("generateToken method must throw an error if privateKey is undefined", () => {
        jwtService.privateKey = undefined;
        jwtService.readPrivateKey = jest.fn();
        const toThrowTestFunction = () => {
            jwtService.generateToken({}, {} as SignOptions);
        };
        expect(toThrowTestFunction).toThrowError();
    });

    describe("readPublicKey", () => {
        beforeEach(() => {
            jwtService.publicKey = undefined;
        });
        test("must define publicKey with a valid string", () => {
            jwtService.readPublicKey();
            expect(jwtService.publicKey).toEqual(TEST_DATA);
        });
        test("must throw an error if could not read the file", () => {
            jwtService.readPublicKey();
            expect(logMock.errorMock).toHaveBeenCalled();
        });
    });
});