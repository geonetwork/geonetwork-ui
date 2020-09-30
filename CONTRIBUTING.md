# Contributing to GeoNetwork UI

## Setting Up Your Development Environment



## Running GeoNetwork UI

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.


## Testing and Building


Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


Run `npm run test` to execute the unit tests via Jest.


## Contributing code

### linting & formatting

To run the lint step, use `npm run lint`.

To check whether your code is formatted properly, use `npm run format:check`.

If you want Prettier to run on all the code and make sure everything is formatted, run `npm run format:fix`.
**This should be done before committint.**

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

### Web components
The architecture is designed so you can export an Angular component to a custom element (eg Web Component), 
that is encapsulated with its style in a shadow DOM element, and can be embedded in any web site.

#### Export a Web Component
To export something as a web component you have to
- create a new angular application in `/webcomponents`
- create a new component in this application, that will be exported, this component must have the following properties in the metadata decorator:
```typescript
{
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
}
```
- export your component as a custom element in `app.module.ts`
```typescript
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(SearchSnapshotWcComponent, {
      injector,
    })
    customElements.define('gn-search-snapshot', customButton)
  }

  ngDoBootstrap() {}
}
```
- if you are using `ng-bootstrap` as peer dependency, you have to add `import '@angular/localize/init'` in your `app/polyfill.ts`

#### Test your Web Component
1. Storybook

You can visualise your web component as it would be in a standalone web page with Storybook.
```shell script
npm run storybook-wc
```
2. Full deployment

To test your web component in true a web page, run
```shell script
npm run serve-wc -- (application_name) (webcomponent_tag_name) [--build]
```
- `application_name` is the name you gave to your Angular application in `/webcomponents` root folder.
- `webcomponent_tag_name` is the tag name you gave in your `AppModule` to your exported web component.
- `--build` (optional) forces a rebuild of your webcomponent.

You'll be able to test your web component on http://127.0.0.1:8001

To use your component in a real web page, you have to
- import the script exported by Angular
- include your web component in the HTML content.

```angular2html
    <script src="gn-search-snapshot.js"></script>
    <gn-search-snapshot></gn-search-snapshot>
```

### Openapi client generation

Geonetwork publish an `openapi` rest api, and expose an `openapi` specification document.
This document is temporarily stored in `tools/spec.yml`, but in the end, should point on a geonetwork openapi documentation url.

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