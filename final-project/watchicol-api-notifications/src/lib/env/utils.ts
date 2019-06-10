import { join } from "path";

const POSITIONS_GET_EXTENSION_FILE_TS = -3;

export function getOsEnv(key: string): string {
    if (typeof process.env[key] === "undefined") {
        throw new Error(`Environment variable ${key} is not set.`);
    }
    const ENVIRONMENT_VARIABLE: string = process.env[key] as string;

    return ENVIRONMENT_VARIABLE;
}

export function getPath(path: string): string {
    const PATH: string = (process.env.NODE_ENV === "production")
        ? join(process.cwd(), path.replace("src/", "dist/").slice(0,
            POSITIONS_GET_EXTENSION_FILE_TS) + ".js")
        : join(process.cwd(), path);

    return PATH;
}

export function getPaths(paths: Array<string>): Array<string> {
    const ARRAY_OF_PATHS: Array<string> = paths.map((p) => getPath(p));

    return ARRAY_OF_PATHS;
}

export function getOsPaths(key: string): Array<string> {
    return getPaths(getOsEnvArray(key));
}

export function getOsEnvArray(key: string, delimiter: string = ","): Array<string> {
    const ARRAY_FROM_PATH: Array<string> = process.env[key] && process.env[key].split(delimiter) || [];

    return ARRAY_FROM_PATH;
}

export function toNumber(value: string): number {
    const NUMBER: number = parseInt(value, 10);

    return NUMBER;
}

export function toBool(value: string): boolean {
    const TO_BOOL: boolean = value === "true";

    return TO_BOOL;
}

export function getOsEnvOptional(key: string): string | undefined {
    const OPTIONAL_ENVIRONMENT_VARIABLE: string = process.env[key];

    return OPTIONAL_ENVIRONMENT_VARIABLE;
}