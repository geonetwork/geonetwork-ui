---
name: geospatial-sdk-map-layers
description: >-
  Add and manage layers (WMS, WFS, OGC API, GeoJSON/vector, XYZ, WMTS, MapLibre
  style, GeoTIFF) on a map in GeoNetwork-UI using the geospatial-sdk MapContext
  model. Use when working with the datahub record map preview, the map-viewer,
  the `gn-ui-map-container` component, the NgRx map state (`MapFacade` /
  `MapContext`), or any task that builds or updates a map context to display
  geographic data on a map.
---

# Adding layers to a map with geospatial-sdk

GeoNetwork-UI renders maps with [`@geospatial-sdk`](https://github.com/camptocamp/geospatial-sdk). The SDK is **declarative**: instead of imperatively calling an OpenLayers API, you describe the map as a plain serializable object — a **`MapContext`** — and the SDK reconciles it onto an OpenLayers map. Adding/removing/updating a layer = producing a new `MapContext` with a different `layers` array.

```ts
interface MapContext {
  layers: MapContextLayer[]
  view: MapContextView | null // null => default global view
}
```

Installed packages: `@geospatial-sdk/core` (types + `MapContext`, `createViewFromLayer`, diff utils, event types), `@geospatial-sdk/openlayers` (`createMapFromContext`, `applyContextDiffToMap`, `listen`), `@geospatial-sdk/legend`, `@geospatial-sdk/geocoding`. In app code you almost always import **only** types/helpers from `@geospatial-sdk/core`; the OpenLayers wiring is encapsulated inside `gn-ui-map-container`.

## Two ways the context reaches the map

There are two distinct patterns in the codebase — pick based on what you are touching.

### 1. Direct `[context]` binding — the datahub record map preview

The datahub's record preview map (`libs/feature/record/src/lib/map-view/map-view.component.ts`, selector `gn-ui-map-view`) does **not** use the NgRx map state. It builds a `MapContext` reactively from the selected dataset link and binds it straight to the presentation component:

```html
<gn-ui-map-container
  #mapContainer
  [context]="mapContext$ | async"
  (featuresClick)="onMapFeatureSelect($event)"
  (sourceLoadError)="onSourceLoadError($event)"
></gn-ui-map-container>
```

The context is derived from the user-selected `DatasetOnlineResource` via `getLayerFromLink(link)` (maps a GN link protocol → a `MapContextLayer`), then a view is computed with `createViewFromLayer(layer)` (auto-zoom to the layer), falling back to the record's spatial extent:

```ts
mapContext$: Observable<MapContext> = this.currentLayers$.pipe(
  switchMap((layers) =>
    from(createViewFromLayer(layers[0])).pipe(
      catchError(() => of(null)),               // can't zoom on layer → use record extent
      map((view) => ({ layers, view })),
    ),
  ),
  startWith({ layers: [], view: null }),
  // ...fallback: view = record bbox extent when createViewFromLayer returned null
)
```

Use this pattern when the layer(s) are fully determined by component inputs/state and there is no need to share or persist the map across the app. **No store involved** — just produce a new `MapContext` and let `gn-ui-map-container` diff it.

### 2. NgRx map state — the shared, editable map (`feature/map`)

`libs/feature/map` owns a **shared map context** in an NgRx feature state, used by the map-viewer and the interactive layer tools. Access it **only** through `MapFacade` (never inject `Store` directly — see root `AGENTS.md`):

```ts
// libs/feature/map/src/lib/+state/map.facade.ts
@Injectable()
export class MapFacade {
  context$: Observable<MapContext>        // current map context
  selectedFeatures$: Observable<Feature[]>
  applyContext(context: MapContext): void // replaces the whole context
  selectFeatures(features: Feature[]): void
  clearFeatureSelection(): void
}
```

The state is registered by `FeatureMapModule` (`StoreModule.forFeature(MAP_FEATURE_KEY, mapReducer)`), which also provides `MapFacade`. `MapStateContainerComponent` (`gn-ui-map-state-container`) bridges the store to the presentation component: `context$ = mapFacade.context$` bound to `<gn-ui-map-container [context]="context$ | async">`, forwarding clicks back into `selectFeatures` / `clearFeatureSelection`.

## The core recipe: update layers immutably

Whether you go through the facade or build a local context, **always treat `MapContext` and its `layers` array as immutable** (reducers + OnPush change detection + the SDK diff all rely on new references). Read the current context, then emit a fresh object.

```ts
// ADD a layer (see add-layer-from-wms/-wfs/-file components)
const context = await firstValueFrom(this.mapFacade.context$)
this.mapFacade.applyContext({
  ...context,
  layers: [...context.layers, layerToAdd],
})

// REMOVE a layer by index (see layers-panel.component.ts)
this.mapFacade.applyContext({
  ...context,
  layers: context.layers.filter((_, i) => i !== index),
})

// UPDATE a layer (e.g. toggle visibility / set opacity)
this.mapFacade.applyContext({
  ...context,
  layers: context.layers.map((l, i) =>
    i === index ? { ...l, visibility: !l.visibility } : l
  ),
})
```

For the direct-binding pattern (#1) the same applies, except you push the new `MapContext` into your local `Observable`/signal that feeds `[context]` instead of calling `applyContext`.

## Layer types (`MapContextLayer` from `@geospatial-sdk/core`)

Every layer is a discriminated union on `type`. Build the typed object, then add it to `layers`.

| `type` | Required fields | Notes |
|---|---|---|
| `'wms'` | `url`, `name` | opt: `style`, `format` (MIME), `useTiles` (default true), `dimensionValues` |
| `'wmts'` | `url`, `name` | opt: `style`, `dimensionValues` |
| `'wfs'` | `url`, `featureType` | vector; opt: `style`, `hoverStyle` (`VectorStyle`) |
| `'ogcapi'` | `url`, `collection` | opt: `useTiles: 'vector' \| 'map'`, `tileMatrixSet`, `options` |
| `'geojson'` | `data` **xor** `url` | `data`: `FeatureCollection` or string; never set both |
| `'xyz'` | `url` | opt: `tileFormat: 'application/vnd.mapbox-vector-tile'` for vector tiles (used for TMS) |
| `'maplibre-style'` | `styleUrl` | opt: `accessToken` |
| `'geotiff'` | `url` | raster COG |

Common optional base props on **every** layer (`MapContextBaseLayer`): `id`, `version` (bump to force a refresh), `label` (shown in layer lists / popups), `visibility` (default `true`), `opacity` (0–1), `attributions`, `clickable` (default `true`), `hoverable` (default `false`), `extras` (app-specific, keep serializable).

Concrete examples (from the `add-layer-from-*` components):

```ts
const wms:  MapContextLayer = { type: 'wms', url, name: layer.name, label: layer.title }
const wfs:  MapContextLayer = { type: 'wfs', url, featureType: layer.name, label: layer.title }
const geo:  MapContextLayerGeojson = { type: 'geojson', data, label }      // data = parsed FC or raw string
const ogc:  MapContextLayerOgcApi  = { type: 'ogcapi', url, collection, useTiles: 'vector', label }
const tms:  MapContextLayer = { type: 'xyz', url: `${base}/${name}/{z}/{x}/{y}.pbf`,
                                tileFormat: 'application/vnd.mapbox-vector-tile', name }
```

## View (`MapContextView`)

`center` and `extent` are expressed in **longitude/latitude (EPSG:4326)**, not map projection units.

- by center+zoom: `{ center: [lon, lat], zoom }`
- by extent: `{ extent: [minX, minY, maxX, maxY] }`
- by geometry: `{ geometry }` (GeoJSON)
- plus optional `maxZoom`, `maxExtent`. Set `view: null` for the default global view.

Prefer `await createViewFromLayer(layer)` to auto-frame a layer; fall back to a record/extent-based view when it returns `null`.

## The presentation component: `gn-ui-map-container` (`@geonetwork-ui/ui/map`)

This is the only place OpenLayers is touched. It is a pure dumb component (`ui/`): give it a context, listen to events.

- `@Input() context: MapContext | null` — on first render it calls `createMapFromContext`; on later changes it computes `computeMapContextDiff(new, old)` and applies only the delta (so **immutable updates are essential**).
- Outputs (lazily attached — only wired if you bind them): `featuresClick`, `featuresHover`, `mapClick`, `extentChange`, `resolvedExtentChange`, `sourceLoadError`.
- `openlayersMap: Promise<OlMap>` — await it for direct OpenLayers access (e.g. `MapViewComponent.ngAfterViewInit` tweaks interactions).
- A default Carto basemap + any configured `BASEMAP_LAYERS` are prepended automatically; suppress via the `DO_NOT_USE_DEFAULT_BASEMAP` token. View constraints come from `MAP_VIEW_CONSTRAINTS`. So **do not add a basemap to your `layers` yourself** unless intentionally replacing it.

## Ready-made smart components (`@geonetwork-ui/feature/map`)

Prefer reusing these over re-implementing the add-layer flow:

- `gn-ui-map-state-container` — a `gn-ui-map-container` wired to the NgRx map state.
- `gn-ui-layers-panel` — full add/remove UI; aggregates the add-layer tools below.
- `gn-ui-add-layer-from-wms`, `gn-ui-add-layer-from-wfs` — resolve layers from an endpoint URL via `@camptocamp/ogc-client`, then `applyContext`.
- `gn-ui-add-layer-from-ogc-api` — emits `@Output() layerAdded: MapContextLayer` (parent decides how to add it).
- `gn-ui-add-layer-from-file` — GeoJSON upload (≤ 5 MB).
- `gn-ui-add-layer-from-catalog` — add a layer from a catalog record.

## Gotchas

- Resolving WMS/WFS/OGC API endpoints (listing layers, capabilities) is done with **`@camptocamp/ogc-client`** (`WmsEndpoint`, `WfsEndpoint`, `OgcApiEndpoint`), not the geospatial-sdk. The SDK only consumes the final `MapContextLayer`.
- The map state is **not a singleton convenience** — `MapFacade` is provided by `FeatureMapModule`; inject it only from within that module's scope.
- Never mutate `context.layers` in place; always spread into a new array/object.
- Keep `extras` serializable (no functions) — the SDK may JSON-serialize layers for change detection.

## Reference files

- State: `libs/feature/map/src/lib/+state/{map.facade,map.actions,map.reducer,map.selectors}.ts`
- Add/remove flows: `libs/feature/map/src/lib/add-layer-from-*/`, `layers-panel/`, `map-state-container/`
- Datahub preview: `libs/feature/record/src/lib/map-view/map-view.component.ts`
- Presentation: `libs/ui/map/src/lib/components/map-container/map-container.component.ts`
- SDK types: `node_modules/@geospatial-sdk/core/dist/model/map-context.d.ts`
