// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  encodings: [
    {
      label: 'UTF-8',
      value: 'UTF-8',
    },
    {
      label: 'ISO-8859-1',
      value: 'ISO-8859-1',
    },
  ],
  projections: [
    {
      label: 'WGS84',
      value: 'EPSG:4326',
    },
    {
      label: 'Lambert 93',
      value: 'EPSG:2154',
    },
    {
      label: 'Web Mercator',
      value: 'EPSG:3857',
    },
  ],
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
