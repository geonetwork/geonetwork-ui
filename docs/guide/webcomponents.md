---
outline: deep
---

# Web components

Visit the online [demo page](https://geonetwork.github.io/geonetwork-ui/main/demo/webcomponents/).
This directory contains [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) relying on the same code as the full GeoNetwork UI, and which are available for use in third-party apps.

Web Components are published through an Angular application `webcomponents` hosted in [`apps/webcomponents/src`](https://github.com/geonetwork/geonetwork-ui/tree/main/apps/webcomponents/src) folder. It's a common Angular application, the only difference is that all Angular components
are registered as Web Components in the application module.

All Web Components are prefixed with `gn-`.

## Use

Web Components are made to be easily included in any context. To do so, you have to:

- import the Web Component script exported by Angular (available via jsdelivr)
- include your Web Component in the HTML content.

```html
<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-v2.0.0/gn-wc.js"></script>
...
<gn-results-list api-url="https://dev.geo2france.fr/geonetwork/srv/api" catalog-url="https://dev.geo2france.fr/datahub/dataset/{uuid}" size="10" layout="ROW" show-more="button"></gn-results-list>
```

::: tip
The Web Components script also includes the [Standalone Search](./standalone-search.md).
:::

## Internationalization

Web Components support the following attributes for handling internationalization:

- `text-language`: the language to use for labels; can be either be `browser` (will use the browser language) or a 2-char code (e.g. `en`); defaults to `browser`
- `metadata-anguage`: identical to the [`metadata_language` configuration option](./configure.md#global)

## Publication and Versioning

The Web Component script is automatically built upon merges on main and for releases. These builds are made available via a jsdelivr CDN, which points at `wc-dist` branches in the github repository. There is a `wc-dist` branch for every release tag > `v2.0.0` as well as `wc-dist-main`.

You can choose the version of the Web Component script you wish to use by indicating the corresponding value in the script's URL e.g. `wc-dist-v2.0.0`.

## Build

All Angular custom elements are served by the same application `webcomponents`.

Therefore, there is only one build and one javascript file for all web components called `gn-wc.js`.

```
npm run build:demo
```

You'll find the built files in `dist/demo/webcomponents` folder

## Run

To test your Web Component in a real production context

```shell script
npm run demo
```

**Important:** The components are built in `production` mode.

You can go to http://localhost:8001/ to visit GeoNetwork-UI Web Components demo pages.

You'll be able to test your Web Components on `http://localhost:8001/webcomponents/{name_of_sample_file}`

e.g: http://localhost:8001/webcomponents/gn-results-list.sample.html

## Create a new Web Component

The architecture is designed so that you can export an Angular component to a custom element (e.g. Web Component),
that is encapsulated with its style in a shadow DOM element, and can be embedded in any website.

To export content as a Web Component you have to:

- create a new folder in [`/apps/webcomponents/src/app/components`](https://github.com/geonetwork/geonetwork-ui/tree/main/apps/webcomponents/src/app/components), the folder name must start with `gn-`
- create a new component in this folder, with same name, that will be exported, this component must have the following properties in the metadata decorator:

```typescript
{
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
}
```

- add your component in the application module [`webcomponents.module.ts`](https://github.com/geonetwork/geonetwork-ui/blob/main/apps/webcomponents/src/app/webcomponents.module.ts) `declarations` list.
- register your component as a custom element in the `CUSTOM_ELEMENTS` array in application module [`webcomponents.module.ts`](https://github.com/geonetwork/geonetwork-ui/blob/main/apps/webcomponents/src/app/webcomponents.module.ts), the custom element identifier (i.e Web Component tag name) _must_ be the same as the component folder name

```typescript
const CUSTOM_ELEMENTS: any[] = [
  [GnFacetsComponent, 'gn-facets'],
  [GnResultsListComponent, 'gn-results-list'],
  [GnAggregatedRecordsComponent, 'gn-aggregated-records'],
]
}
```

- Add stories for storybook to run it (angular and element stories)
- Add a sample HTML file to show how to use it in a third party web page `${webcomponent_name}.sample.html` e.g. gn-results-list.sample.html

## Update Web Component inputs

You can handle angular custom elements input changes exactly as it's done for Angular component: within the `onChanges` implementation.

Update Web Component input values from the source page:

```html
<div>
  <button id="changeSizeBtn">Change size</button>
</div>
<gn-results-list api-url="https://dev.geo2france.fr/geonetwork/srv/api"></gn-results-list>

<script>
  const wc = document.getElementsByTagName('gn-results-list')[0]
  const btn = document.getElementById('changeSizeBtn')
  btn.addEventListener('click', () => (wc.size = 3))
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

- Don't call api request before the Web Component has initialized `API_BASE_PATH`
- `ngOnChanges` is called the first time before `ngOnInit`, so put your init code in `ngOnchanges` instead.
- Be sure to trigger the change detection when it is expected, because the Web Component execution (even though it's in an angular custom element) is outside an Angular zone, meaning the change detection is not triggered.

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

## HTML embedder

The file [`wc-embedder.html`](https://github.com/geonetwork/geonetwork-ui/blob/main/tools/webcomponent/wc-embedder.html) can be used to wrap a geonetwork-ui Web Component into a full HTML page,
for example to be used in an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

To use it, specify the name and attributes of the Web Component to be created when accessing the page:

```
wc-embedder.html?e=gn-dataset-view-table&a=api-url=https://dev.geo2france.fr/geonetwork/srv/api&a=primary-color=%230f4395&a=secondary-color=%238bc832&a=main-color=%23555&a=background-color=%23fdfbff
```

> Note the `#` being encoded to `%23`

The following query parameters are supported:

- `e` (single): element name, such as `gn-results-list`
- `a` (multiple): attributes, specified in the following format: `a=attribute-name=attribute-value`

The created element will be sized to take the full width and height of the page, thus allowing precise sizing when used in an iframe.

The Web Components used are the latest ones distributed on the [`wc-dist` branch](https://github.com/geonetwork/geonetwork-ui/blob/wc-dist).

The HTML Embedder is available in all docker images on the following path:

http://localhost:8080/APP_NAME/wc-embedder.html
