// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentInterface } from '../app/core/interfaces/environment.interface';

export const environment: EnvironmentInterface = {
  production: false,
  baseUrl: 'http://localhost:5000/rest',
  googleMapsUrl: 'https://maps.googleapis.com/maps/api/geocode',
  logoIconDefault: 'http://10.244.111.222:6060/storages/e11b277c-b2e2-46dd-b75f-8e6778022d3c'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
