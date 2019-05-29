import { IGeometry } from "./IGeometry";

export interface GeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}
