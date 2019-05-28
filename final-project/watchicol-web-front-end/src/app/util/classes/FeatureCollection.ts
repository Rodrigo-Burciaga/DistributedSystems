import { GeoJson } from './GeoJson';

export class FeatureCollection {
  public type = 'FeatureCollection';
  public areaTexto: string;
  public tipoDenuncia: string;

  constructor(public features: Array<GeoJson>, tipoDenuncia: string, areaTexto: string) {
    this.areaTexto = areaTexto;
    this.tipoDenuncia = tipoDenuncia;
  }
}

