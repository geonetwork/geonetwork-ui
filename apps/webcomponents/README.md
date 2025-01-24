# GeoNetwork UI Web Components

Visit the online [demo page](https://geonetwork.github.io/geonetwork-ui/main/demo/webcomponents/).
This directory contains [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) relying on the same code as the full GeoNetwork UI, and which are available for use in third-party apps.

Web Components are published through an Angular application `webcomponents` hosted in `apps/webcomponents/src` folder. It's a common Angular application, the only difference is that all Angular components
are registered as Web Components in the application module.

All Web Components are prefixed with `gn-`.

Web Components are made to be easily included in any context, e.g.:

```html
<script src="https://cdn.jsdelivr.net/gh/geonetwork/geonetwork-ui@wc-dist-main/gn-wc.js"></script>
...
<gn-results-list api-url="https://apps.titellus.net/geonetwork/srv/api" size="10" layout="TITLE" filters="soil"></gn-results-list>
```

## Build

All Angular custom elements are served by the same application `webcomponents`.

Therefore, there is only one build and one javascript file for any web components called `gn-wc.js`.

```
npm run build:demo
```

You'll find the built files in `webcomponents/dist/demo/webcomponents` folder

## Run

### Storybook

```shell script
npm run storybook-wc
```

This will build all components and start an instance of Storybook but with specific stories showcasing each individual Web Component.

Note that each WebComponent should appear in two stories: one where it is included as an Angular component, and another where it is included as a Web Component.

### Web server

To test your Web Component in a real production context

```shell script
npm run demo
```

**Important:** The components are built in `production` mode.

You can go on http://localhost:8001/ to visit GeoNetwork-UI Web Components demo pages.

You'll be able to test your Web Components on `http://localhost:8001/webcomponents/{name_of_sample_file}`

e.g: http://localhost:8001/webcomponents/gn-results-list.sample.html

This script show you how to deploy your Web Component in a real world, it builds it, then to use your component in a real web page, you have to

- import the script exported by Angular
- include your Web Component in the HTML content.

## Create a new Web Component

The architecture is designed so you can export an Angular component to a custom element (eg Web Component),
that is encapsulated with its style in a shadow DOM element, and can be embedded in any website.

To export content as a Web Component you have to:

- create a new folder in `/apps/webcomponents/src/app/components`, the folder name must start with `gn-`
- create a new component in this folder, with same name, that will be exported, this component must have the following properties in the metadata decorator:

```typescript
{
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
}
```

- Provide the dependencies which are not inject in root by default (eg `SearchFacade`, `SearchService`, etc.)

```typescript
{
  providers: [SearchFacade]
}
```

- import gnui styles from the component css file

```css
@import '../../../styles.css';
```

- add your component in application module `webcomponents.module.ts` `declarations` list.
- register your component as a custom element in the `CUSTOM_ELEMENTS` array in application module `webcomponents.ts`, the custom element identifier (i.e Web Component tag name) _must_ be the same as the component folder name

```typescript
const CUSTOM_ELEMENTS: any[] = [
  [GnFacetsComponent, 'gn-facets'],
  [GnResultsListComponent, 'gn-results-list'],
  [GnAggregatedRecordsComponent, 'gn-aggregated-records'],
]
}
```

- Add stories for storybook to run it (angular and element stories)
- Add a sample HTML file to show how to use it in a third party web page `${webcomponent_name}.sample.html` eg. gn-results-list.sample.html

## Update Web Component inputs

You can handle angular custom elements input changes exactly as it's done for Angular component: within the `onChanges` implementation.

Update Web Component input values from the source page:

```html
<div>
  <button id="changeSizeBtn">Change size</button>
</div>
<gn-results-list api-url="https://apps.titellus.net/geonetwork/srv/api"></gn-results-list>

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
