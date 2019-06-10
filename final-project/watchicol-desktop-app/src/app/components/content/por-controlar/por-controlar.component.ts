import { Component, NgZone, OnInit } from '@angular/core';
import { GeoJson } from '../../../util/classes/GeoJson';
import { geometry } from '../../../util/classes/DuctosGeometry';
import { HttpService } from '../../../services/http/http.service';
import { ContentService } from '../../../services/ui/content.service';
import { ResponseAPIInterface } from '../../../util/interfaces/ResponseAPIInterface';
import { IGeoJson } from '../../../util/interfaces/IGeoJSON';
import { Marker } from 'mapbox-gl';
import { FeatureCollection } from '../../../util/classes/FeatureCollection';

declare var $: any;

@Component({
  selector: 'app-por-controlar',
  templateUrl: './por-controlar.component.html',
  styleUrls: ['./por-controlar.component.css']
})
export class PorControlarComponent implements OnInit {

  public geoJson: GeoJson;
  public tipo = '';
  public areaTexto = '';
  public errorMessage: string;
  public alerta = undefined;
  public geometry = geometry;
  public points: Array<GeoJson>;


  constructor(private httpService: HttpService,
              private contentService: ContentService) {
    // longitude, latitude
    const coordinates: number[] = [-99.146863, 19.504937];
    this.geoJson = new GeoJson(coordinates);
    this.initializeMap();
    this.contentService.changeState('Nueva Denuncia');
  }

  ngOnInit() {
    if (!this.points) {
      this.httpService.getIncidenciasPorControlar().subscribe((data: ResponseAPIInterface<Array<IGeoJson>>) => {
        if (data.status !== 'error') {
          this.fillPoints(data);
        } else {
          this.mostrarAlert('Estamos teniendo problemas para obtener la información');
        }
      });
    }
  }

  public fillPoints(data: ResponseAPIInterface<Array<IGeoJson>>) {
    if (data.data.length > 0) {
      this.points = [];
      data.data.map((item: IGeoJson) => {
        item.properties = [];
        console.log(item);
        this.points.push(item);
      });
    }
  }

  public initializeMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat: number = position.coords.latitude;
        const lng: number = position.coords.longitude;
        this.geoJson.geometry.coordinates = [lng, lat];
      });
    }
  }

  private mostrarAlert(message: string) {
    this.errorMessage = undefined;
    this.alerta = message;
    $('#exampleModal').modal('hide');
    setTimeout(() => {
      this.alerta = undefined;
    }, 5000);
  }

  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();
    this.geoJson.geometry.coordinates = marker.getLngLat().toArray();
  }

  public nuevaDenunciaAControlar() {
    const features: FeatureCollection = new FeatureCollection([this.geoJson], this.tipo, this.areaTexto);
    this.httpService.nuevaDenunciaAControlar(features).subscribe((data: ResponseAPIInterface<any>) => {
      if (data.status === 'error') {
        if (data.httpStatusCodeError === 404) {
          this.mostrarAlert('Selecciona un punto adecuado cercano a una denuncia');
        } else {
          this.mostrarAlert('Ocurrió un error, intentalo más tarde');
        }
      } else {
        this.mostrarAlert('Nueva incidencia a controlar creada');
      }
      console.log(data);
    });

  }

}
