export class CodeResponse {
  public static readonly OK: number = 1;
  public static readonly GENERIC_ERROR: number = -1;
  public static readonly HTTP_ERROR: number = 0;
  public static readonly BAD_URI_REQUESTED: number = -2;
  public static readonly HTTP_NOT_FOUND: number = 404;
  public static readonly BAD_REQUEST: number = 400;
  public static readonly UNAUTHORIZED_ERROR: number = 401;
  public static readonly INTERNAL_SERVER_ERROR: number = 500;
}
