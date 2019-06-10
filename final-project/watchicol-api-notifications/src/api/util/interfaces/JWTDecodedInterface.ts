export interface JWTDecodedInterface {
    iat: number;
    exp: number;
    iss: string;
    sub: string;
    data?: any;
    aud?: string;
}