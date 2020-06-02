# Contributing to GeoNetwork UI

## Setting Up Your Development Environment



## Running GeoNetwork UI

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 
The app will automatically reload if you change any of the source files.


## Testing and Building


Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


Run `ng test` to execute the unit tests via 


## Contributing code

### Angular CLI

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

Common command to generate a component in a lib
```shell script
ng g c smart/fuzzy-search --project=lib-search --style=css --changeDetection=OnPush -d
```
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Web components
The architecture is designed so you can export an Angular component to a custom element (eg Web Component), 
that is encapsulated with its style in a shadow DOM element, and can be embedded in any web site.

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
- build your application in prod mod with `ng build --prod --output-hashing=none search-wc` at the root of the project. 

To use your webcomponent in a website, you can
- merge all the build output javascript files into one and GZIP it
```shell script
cat dist/search-wc/{runtime-es2015,polyfills-es2015,main-es2015}.js | gzip > gn-search-snapshot.js.gz
```
- include it in your HTML file
```angular2html
...
    <script src="gn-search-snapshot.js"></script>
...
    <gn-search-snapshot></gn-search-snapshot>
```
and run your html file in a web server