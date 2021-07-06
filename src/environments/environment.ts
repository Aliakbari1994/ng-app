// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // backend url
  apiUrl: 'http://localhost:8000/api/web',
  // google recaptcha v3
  recaptcha_site_key: '6LcumA8aAAAAANUpkUsGaymjN0FZaN7cQUgr7t4T',
  recaptcha_secret_kay: '6LcumA8aAAAAAAgz2nIAdz5Ur-P9Fe9rAKjbEJa2',
  // passport auth
  grant_type: 'password',
  client_id: 2,
  client_secret: 'z6GBMKPgFThOSmVr889Jj5rGserP1uxXWOAx5xwR',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
