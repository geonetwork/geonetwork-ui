# Contributing to GeoNetwork UI

## Setting Up Your Development Environment



## Running GeoNetwork UI

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.

## Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

You can build a specific application with
```shell script
ng build (app_name) (--prod)
```

## Tests
Run `ng test` to execute the unit tests via Jest.

You can test a specific lib or app with
```shell script
ng test (lib_name) (--prod)
```

To run the tests in Intellij, install the Jest plugin and run the test as usual.

You may need to edit your configuration and set up the *Working Directory* to root of the project (e.g `~/dev/geonetwork-ui/`)

You can set up the correct *Working Directory* once for all by putting the correct value in Jest Template (Edit configuration/Templates/Jest/Working Directory)

## Contributing code

### linting & formatting

To run the lint step, use `npm run lint`.

To check whether your code is formatted properly, use `npm run format:check`.

If you want Prettier to run on all the code and make sure everything is formatted, run `npm run format:fix`.
**This should be done before committing.**

### Angular CLI

### Code scaffolding

Run `ng generate component component-name --project=<project name>` to generate a new component. You will have to specify a project, which can be:
* `app-search`: main app
* `lib-search`: search-related smart components
* `lib-ui`: presentation components

You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Common command to generate a component in a lib
```shell script
ng g c smart/fuzzy-search --project=lib-search --style=css --changeDetection=OnPush -d
```
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Openapi client generation

GeoNetwork publish an OpenAPI rest api, and expose an `openapi` specification document (see https://localhost:8080/geonetwork/srv/api/doc.yml).
This document is temporarily stored in `tools/spec.yml`, but in the end, should point on a GeoNetwork OpenAPI documentation url.

From this specification file, we are using [openapi-generator](https://openapi-generator.tech/) to generate a `typescript-angular` client for our application.
The generated client is stored in the library `gn-api`. It contains the services and model definitions.

The api `baseUrl` is stored in the api specification document, and overwritten via Angular injection
```typescript
    {
      provide: BASE_PATH,
      useValue: '/geonetwork/srv/api',
    },
```
This might need to be changed for further deployment, it is used in dev mode environment only for the moment.

To generate the client, run `npm run generate-api`

### i18n

Translations are managed by [ngx-translate](https://github.com/ngx-translate/core).

To set up translate service, import the module in your application/lib root module:
```typescript
// Application module, root
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}
...
imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      defaultLanguage: 'fr',
    }),
]

// Library module, child
imports: [
    TranslateModule.forChild(),
]
```

To declare a string to be translated, use following syntax
```html
<input
  [title]="'Sort by' | translate"
/>

<div translate>search<div/>
```
``` typescript
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

marker('last changed')
marker('popularity')
```

All translated files are stored in applications assets `i18n` folder (eg: apps/search/src/assets/i18n).

To extract automatically all translations use
```shell script
npm run i18n:extract
```

Check all target languages are defined in extraction script
```shell script
    "i18n:extract": "ngx-translate-extract --input ./apps/search/src  ./libs --output ./apps/search/src/assets/i18n/{en,fr,da,de,fi,nb,nl,sv}.json --clean --format json"
```

All translation files are merged, unused strings are removed. Don't forget to use `Marker` to add dynamic translations.
