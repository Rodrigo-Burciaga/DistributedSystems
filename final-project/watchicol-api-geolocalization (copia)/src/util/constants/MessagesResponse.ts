export class MessagesResponse {

    // HTTP MESSAGES STATUS //
    public static readonly BAD_REQUEST = "Bad Request";
    public static readonly INTERNAL_SERVER_ERROR = "Internal Server Error";
    public static readonly SERVICE_UNAVAILABLE = "Service Unavailable";
    public static readonly NOT_FOUND = "Not Found";

    // STATUS //
    public static readonly STATUS_SUCCESS = "Success";
    public static readonly STATUS_ERROR = "Error";

    // MESSAGES DESCRIPTION//
    public static readonly GENERIC_ERROR = "Error";
    public static readonly BAD_CLIENT_PROVIDED = "The client does not exits";
    public static readonly BAD_CREDENTIALS = "Bad credentials provided";
    public static readonly NOT_FOUND_DESCRIPTION = "The resource you are  browsing was not found";
    public static readonly UNAUTHORIZED_DESCRIPTION = "You have not provided the authorization header or " +
        "you give bad authorization";

}