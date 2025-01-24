---
outline: deep
---

# Interactive maps

GeoNetwork-UI relies on the [geospatial-sdk](https://github.com/camptocamp/geospatial-sdk) library to render maps. This library works by taking in a Map Context ([see the model here](https://github.com/camptocamp/geospatial-sdk/blob/main/packages/core/lib/model/map-context.ts)) describing the layers and the view of the map to be shown.

Two components are present in GeoNetwork-UI to render a map using a context.

## `MapContainerComponent`

This component simply takes a map context as input and will render it. Everytime the map context changes, the map is updated accordingly.

This component also offers the following events: `mapClick`, `featuresClicked`, `featuresHovered`.

```ts
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
```

```html
<gn-ui-map-container [context]="mapContext" (featuresClick)="handleFeaturesClicked($event)"></gn-ui-map-container>
```

There are a couple of injection tokens that can be used to specify some map options:

- `BASEMAP_LAYERS`: this allows specifying layers that will be added in the background of the map, regardless of the layers in the context; note that there is always a default background tile layer so that the map shown is never empty; this default background layer can be disabled by setting the `DO_NOT_USE_DEFAULT_BASEMAP` token to `true`
- `MAP_VIEW_CONSTRAINTS`: this allows specifying `maxZoom` and `maxExtent` options that will be applied regardless of the map context

## `MapStateContainerComponent`

This component is connected to a map state accessible through the `MapFacade` class. This allows changing the context used in the map from anywhere in the application, as well as showing the currently selected feature in the map (if any).

The `LayersPanel` component is an example of how another component can interact with the map through the `MapFacade` class.

```ts
import { MapStateContainerComponent, MapFacade, LayersPanel } from '@geonetwork-ui/feature/map'
```

```html
<gn-ui-map-state-container></gn-ui-map-state-container> <gn-ui-layers-panel class="absolute inset-y-0 left-0"></gn-ui-layers-panel>
```
