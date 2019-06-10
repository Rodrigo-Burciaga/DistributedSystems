// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mapbox: {
    accessToken: 'pk.eyJ1IjoicmJ1cmNpYWdhIiwiYSI6ImNqdzQzeWtreTFlZmYzenFrbGkwYWhnN3EifQ.nDE_UPSdca5lAu_P6kNuww'
  },
  config: {
    urlProxy: 'http://localhost:80',
    locationServiceAuth: '/auth',
    locationApiGeolocalication: '/geoApi',
    endpointGeoJSON: '/geoJSON',
    endpointNAControlar: '/incidencias/addPorControlar',
    endpointPorControlar: '/incidencias/por/Controlar',
    endpointIControladas: '/incidencias/controladas',
    endpointAuthUser: '/auth_user',
    endpointImplicitGrant: '/implicitGrant',
    endpointTodas: '/incidencias/todas'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
