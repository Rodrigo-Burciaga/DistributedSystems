import { IGeometry } from '../interfaces/IGeometry';
import { IGeoJson } from '../interfaces/IGeoJSON';

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates
    };
  }
}
