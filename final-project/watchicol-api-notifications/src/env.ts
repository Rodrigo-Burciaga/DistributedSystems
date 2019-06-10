require("dotenv").config();

import { getOsEnv, getOsEnvOptional, getOsPaths } from "./lib/env/utils";

export const env = {
    node: process.env.NODE_ENV || "development",
    isProduction: process.env.NODE_ENV === "production",
    isTesting: process.env.NODE_ENV === "test",
    app: {
        routePrefix: getOsEnv("APP_ROUTE_PREFIX"),
        routeVerifyClient: getOsEnv("APP_ROUTE_VERIFYCLIENT"),
        paramVerifyClient: getOsEnv("PARAMS_VERIFY_CLIENT"),
        routeAuthUser: getOsEnv("APP_ENDPOINT_AUTH_USER"),
        routeGrantedAccess: getOsEnv("APP_ENDPOINT_GRANTED_ACCESS_IMPLICIT_GRANT"),
        routeGetSign: getOsEnv("APP_ENDPOINT_GET_SIGN"),
        routeVerifySign: getOsEnv("APP_ENDPOINT_VERIFY_SIGN_ID"),
        endpointVerifyClientKong: getOsEnv("APP_KONG_ADMIN_URL") + getOsEnv("APP_ENDPOINT_KONG_OAUTH2"),
        endpointGetAccessTokenImplicitGrant: getOsEnv("APP_KONG_API_URL_OAUTH2") +
            getOsEnv("APP_ENDPOINT_OAUTH_API_KONG") + getOsEnv("APP_ENDPOINT_KONG_OAUTH2") +
            getOsEnv("APP_ENDPOINT_KONG_AUTH"),
        provisionKey: getOsEnv("APP_PROVISION_KEY"),
        dirs: {
            entities: getOsPaths("DATABASE_ENTITIES"),
            controllers: getOsPaths("CONTROLLERS"),
            middlewares: getOsPaths("MIDDLEWARES"),
            privateKey: getOsEnv("PATH_KEYS_PRIVATE"),
            publicKey: getOsEnv("PATH_KEYS_PUBLIC")
        }
    },
    db: {
        type: getOsEnv("DATABASE_TYPE"),
        host: getOsEnv("DATABASE_HOST"),
        port: getOsEnv("DATABASE_PORT"),
        username: getOsEnv("DATABASE_USER_NAME"),
        password: getOsEnv("DATABASE_PASSWORD"),
        database: getOsEnv("DATABASE_NAME"),
        synchronize: getOsEnvOptional("DATABASE_SYNCHRONIZE"),
        logging: getOsEnv("DATABASE_LOGGING"),
        connectionUrl: getOsEnv("DATABASE_URL")
    }
};