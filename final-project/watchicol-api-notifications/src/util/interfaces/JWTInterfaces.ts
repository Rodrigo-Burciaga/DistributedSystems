export interface SignOptions {
    algorithm: string;
    expiresIn: number;
    audience?: string;
    subject: string;
    issuer?: string;
}