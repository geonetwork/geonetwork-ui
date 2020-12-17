# GeoNetwork UI Webcomponents

This directory contains [webcomponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components) relying on the same code as the full GeoNetwork UI, and which are available for use in third-party apps.

They are Angular components as well, but with a slightly different build system.

All web components are prefixed with `gn-`.

Web components are made to be easily included in any context, e.g.:

```html
<script src="gn-search-input.js"></script>
...
<gn-search-input
  api-url="https://apps.titellus.net/geonetwork/srv/api"
  primary-color="#e73f51"
  secondary-color="#c2e9dc"
  main-color="#212029"
  background-color="#fdfbff"
></gn-search-input>
```

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
- Add a symbolic link for assets (for translations), from `(web_component)/src` run
```shell script
ln -s ../../../apps/search/src/assets/ assets
```
- Add stories for storybook to run it.

## Update web component inputs
You can handle angular custom elements input changes exactly as it's done for Angular component: whithin the `onChanges` implementation.

Update web component input values from the source page:
```html
 <div>
    <button id="changeSizeBtn">Change size</button>
 </div>
 <gn-results-list api-url="https://apps.titellus.net/geonetwork/srv/api"></gn-results-list>

 <script>
    const wc = document.getElementsByTagName('gn-results-list')[0]
    const btn = document.getElementById('changeSizeBtn')
    btn.addEventListener('click', () => wc.size = 3)
 </script>
```

In your angular component, listen to these changes
```typescript
  private setSearch_() {
    this.store.dispatch(
      new SetSearch({ filters: { any: this.filter }, size: this.size })
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes)
    this.setSearch_()
  }
```

This process must follow some rules:
- Don't call api request before the web component has initiliazed `API_BASE_PATH`
- `ngOnChanges` is called the first time before `ngOnInit`, so put your code init in `ngOnchanges` instead.
- Be sure to trigger the change detection when it is expected, because the web component execution (even though it's in an angular custom element) is outside of an Angular zone, meaning the change detection is not triggered.
```typescript
  constructor(
    private changeDetector: ChangeDetectorRef
  ) {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit()
    setTimeout(() => {
      // Be sure to update the source page when the state is updated
      this.store.pipe(select(getSearchResultsLoading)).subscribe((v) => {
        this.changeDetector.detectChanges()
      })
    })
  }
```
