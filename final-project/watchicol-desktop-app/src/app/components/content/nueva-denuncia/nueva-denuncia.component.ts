import { Component, NgZone, OnInit } from '@angular/core';
import { GeoJson } from '../../../util/classes/GeoJson';
import { FeatureCollection } from '../../../util/classes/FeatureCollection';
import { HttpService } from '../../../services/http/http.service';
import { ResponseAPIInterface } from '../../../util/interfaces/ResponseAPIInterface';
import { Marker } from 'mapbox-gl';
import { geometry } from '../../../util/classes/DuctosGeometry';
import { ContentService } from '../../../services/ui/content.service';

declare var $: any;

@Component({
  selector: 'app-nueva-denuncia',
  templateUrl: './nueva-denuncia.component.html',
  styleUrls: ['./nueva-denuncia.component.css']
})
export class NuevaDenunciaComponent implements OnInit {

  public geoJson: GeoJson;
  public tipo = '';
  public areaTexto = '';
  public errorMessage: string;
  public alerta = undefined;
  public geometry = geometry;


  geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          message: 'Foo',
          iconSize: [60, 60]
        },
        geometry: {
          type: 'Point',
          coordinates: [
            -66.324462890625,
            -16.024695711685304
          ]
        }
      },
      {
        type: 'Feature',
        properties: {
          message: 'Bar',
          iconSize: [50, 50]
        },
        geometry: {
          type: 'Point',
          coordinates: [
            -61.2158203125,
            -15.97189158092897
          ]
        }
      },
      {
        type: 'Feature',
        properties: {
          message: 'Baz',
          iconSize: [40, 40]
        },
        geometry: {
          type: 'Point',
          coordinates: [
            -63.29223632812499,
            -18.28151823530889
          ]
        }
      }
    ]
  };

  alert(message: string) {
    alert(message);
  }

  constructor(private httpService: HttpService,
              private contentService: ContentService) {
    // longitude, latitude
    const coordinates: number[] = [-99.146863, 19.504937];
    this.geoJson = new GeoJson(coordinates);
    this.initializeMap();
    this.contentService.changeState('Nueva Denuncia');
  }

  ngOnInit() {
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

  onDragEnd(marker: Marker) {
    NgZone.assertInAngularZone();
    this.geoJson.geometry.coordinates = marker.getLngLat().toArray();
  }

  sendGeoJSON() {
    this.areaTexto = this.areaTexto.trim();
    if (this.areaTexto !== '') {
      this.httpPutGeoJSON();
    } else {
      this.areaTexto = null;
      this.errorMessage = 'Debes llenar el campo area Texto';
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

  private httpPutGeoJSON(): void {
    const features: FeatureCollection = new FeatureCollection([this.geoJson], this.tipo, this.areaTexto);
    this.httpService.postGeoJSON(features).subscribe((data: ResponseAPIInterface<any>) => {
      if (data.status === 'error') {
        this.mostrarAlert('Ocurrió un error, intentlo más tarde');
      } else {
        this.mostrarAlert('Gracias, tu denuncia ha sido enviada');
      }
      console.log(data);
    });
  }


}
