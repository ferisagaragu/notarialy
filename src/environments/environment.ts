// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentInterface } from '../app/core/interfaces/environment.interface';

export const environment: EnvironmentInterface = {
  production: false,
  baseUrl: 'http://10.244.58.54:5000/rest',
  googleMapsUrl: 'https://maps.googleapis.com/maps/api/geocode',
  logoIconDefault: 'http://localhost:6060/storages/408de3b7-8375-41e0-bfda-921a1c3331d4'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
