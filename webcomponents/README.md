# GeoNetwork UI Webcomponents

This directory contains [webcomponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components) relying on the same code as the full GeoNetwork UI, and which are available for use in third-party apps.

They are Angular components as well, but with a slightly different build system.

All web components are prefixed with `gn-`.

## Build
To build a specific webcomponent, run e.g. 
```
npm run build -- --project=gn-search-input
```
You can build all web component with 
```
npm run build:wc
```

## Run
### Storybook
```shell script
npm run storybook-wc
```
This will build all component and start an instance of Storybook but with specific stories showcasing each individual webcomponent.

To build the storybook application, run
```shell script
npm run build:wc
```
**Important:** Web components are built in `dev` mode to work with Storybook.

Note that each webcomponent should appear in two stories: one where it is included as an Angular component, and another where it is included as a webcomponent.


### Web server
To test a specific web component in a real web page, run
```shell script
npm run serve:wc -- (webcomponent_name) [--build]
```
- `webcomponent_name` is the name you gave to your Angular application in `/webcomponents` root folder. It must also be the tag name you gave in your `AppModule` to your exported web component.
- `--build` (optional) forces a rebuild of your webcomponent.

**Important:** The component is built in `production` mode.

You'll be able to test your web component on http://127.0.0.1:8001
This script show you how to deploy your web component in a real world, it builds it, then to use your component in a real web page, you have to
- import the script exported by Angular
- include your web component in the HTML content.

```angular2html
    <script src="gn-search-input.js"></script>
    <gn-search-input></gn-search-input>
```

## Create a new Web Component

The architecture is designed so you can export an Angular component to a custom element (eg Web Component), 
that is encapsulated with its style in a shadow DOM element, and can be embedded in any web site.

To export content as a web component you have to
- create a new angular application in `/webcomponents`, the application must start with `gn-`
- create a new component in this application, that will be exported, this component must have the following properties in the metadata decorator:
```typescript
{
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
}
```
- export your component as a custom element in `app.module.ts`, the custom element identifier (i.e web component tag name) must be the same as the Angular application name
```typescript
export class AppModule {
  constructor(private injector: Injector) {
    const customButton = createCustomElement(SearchSnapshotWcComponent, {
      injector,
    })
    customElements.define('gn-search-input', customButton)
  }

  ngDoBootstrap() {}
}
```
- Add stories for storybook to run it.
