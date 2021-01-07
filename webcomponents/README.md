# GeoNetwork UI Webcomponents

This directory contains [webcomponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components) relying on the same code as the full GeoNetwork UI, and which are available for use in third-party apps.

Web components are published through an Angular application `gn-wc` hosted in `webcomponents/src` folder. It's a common Angular application, the only difference is that all Angular components
are registerd as Web Components in the application module.

All web components are prefixed with `gn-`.

Web components are made to be easily included in any context, e.g.:

```html
<script src="gn-wc.js"></script>
...
    <gn-results-list
      api-url="https://apps.titellus.net/geonetwork/srv/api"
      size="10"
      layout="TITLE"
      filters="+tag.default:Soil"
    ></gn-results-list>
```

## Build
All Angular custom elements are served by the same application `gn-wc`
```
npm run build:wc
```
You'll find the build files in `webcomponents/dist`

## Run
### Storybook
```shell script
npm run storybook-wc
```
This will build all components and start an instance of Storybook but with specific stories showcasing each individual webcomponent.

**Important:** Web components are built in `dev` mode to work with Storybook.

Note that each webcomponent should appear in two stories: one where it is included as an Angular component, and another where it is included as a webcomponent.


### Web server
To test your web component in a real production context
```shell script
npm run demo
```

**Important:** The components are built in `production` mode.

You'll be able to test your web components on `http://localhost:8001/webcomponents/{name_of_sample_file}`

e.g: http://localhost:8001/webcomponents/gn-results-list.sample.html

This script show you how to deploy your web component in a real world, it builds it, then to use your component in a real web page, you have to
- import the script exported by Angular
- include your web component in the HTML content.

## Create a new Web Component

The architecture is designed so you can export an Angular component to a custom element (eg Web Component), 
that is encapsulated with its style in a shadow DOM element, and can be embedded in any web site.

To export content as a web component you have to
- create a new folder in `/webcomponents/src/app/components`, the folder name must start with `gn-`
- create a new component in this folder, with same name, that will be exported, this component must have the following properties in the metadata decorator:
```typescript
{
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
}
```
- add your component in application module `gn-wc.module.ts` `declarations` list.
- register your component as a custom element in `CUSTOM_ELEMENTS` const in  application module `gn-wc.module.ts``app.module.ts`, the custom element identifier (i.e web component tag name) must be the same as the Angular component name
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
