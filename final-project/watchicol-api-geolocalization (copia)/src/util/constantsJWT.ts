export class ConstantsJWT {

    public static readonly METHODS_FOR_READ = {
        utf8: "utf8"
    };
    public static readonly ISSUER: string = "Netlogistik";
    public static readonly RS256: string = "RS256";
    public static readonly DEFAULT_EXPIRE_TIME: number = 86400; // Given in seconds
    public static readonly REGEX_ACCESS_TOKEN = "access_token=.*?&";
    public static readonly TYPES_AUTH = {
        Bearer: "Bearer",
        Basic: "Basic"
    };
}