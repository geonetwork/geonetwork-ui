# feature-search

## Introduction

This library holds all the logic related to searching metadata records in GeoNetwork.

It provides many smart components, most of them connected to an NgRx store. These components allow you to:

- Offer a search input with autocompletion
- Show a list of search results
- Show facets related to search results with filtering capabilities
- Run multiple searches in parallel
- Show full metadata records
- etc.

To use it in an app you need to import both the `StoreModule` and `EffectModule` from `ngrx` like so:

```typescript
import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { RouterModule } from '@angular/router'
import {
  FeatureSearchModule,
  FeatureRecordModule,
  SearchRouterModule,
} from '@geonetwork-ui/feature/search'

// ...

@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot(),
    FeatureSearchModule,
    // NOTE: imports below are optional and will enable URL-based routing
    RouterModule.forRoot([]),
    SearchRouterModule,
    // ...
  ],
  providers: [
    // ...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
```

Note that in the example above we also import the `RouterModule` from Angular, and the `SearchRouterModule` from this library.
**This is optional**, and will synchronize the browser URL with the search features. See the paragraph [Synchronizing state with URL](#synchronizing-state-with-url) for more information.

## Search-related components

Smart components are made to be autonomous and should work together without too much hassle when developing a simple app.
The NgRx store will take care of tracking the search state and dispatch changes to the different components.

You can for example simply associate the following components and the result should give you a basic but working search interface:

```html
<gn-ui-fuzzy-search></gn-ui-fuzzy-search>
<gn-ui-results-hits></gn-ui-results-hits>
<gn-ui-results-list-container></gn-ui-results-list-container>
```

## Handling separate search states

When an application grows it can make sense to have separate search states running in parallel, for example showing a list of the most recent datasets alongside statistics for the whole catalog.

In that case you can make use of the `gnUiSearchStateContainer` directive (which is part of this library) to define boundaries between search states. For example:

```html
<div gnUiSearchStateContainer="latest">
  <gn-ui-results-list-container [layout]="'CARD'"></gn-ui-results-list-container>
</div>
<div gnUiSearchStateContainer="main">
  <gn-ui-fuzzy-search></gn-ui-fuzzy-search>
  <gn-ui-results-list-container [layout]="'LIST'"></gn-ui-results-list-container>
</div>
```

Both search states will be independent and can have different set of filters or options given to them.

## Showing metadata records

To display full metadata records the `FeatureRecordModule` from the `feature/record` library should be used.

This module provides a facade called `MdViewFacade`, which allows you to show or close a metadata record. Please note
that you will have to use the facade to explicitly load the full record, and you can give it an incomplete record (e.g. coming from
a search result) to show a preview to the user.

## Synchronizing state with URL

By default, searching in the GeoNetwork catalog will not impact the browser URL. This means that there is no way to share a current search state
or link to a metadata record, or in other word share _permalinks_ related to metadata search.

By importing the `SearchRouterModule` in an application (and also the [Angular router](https://angular.io/guide/router) if it's not already there yet), two new routes will be registered:

- `/search`: this route will take the user to the search interface; search parameters and filters will be persisted in the URL
  > Note: this is not yet implemented
- `/metadata/:uuid`: this route will take the user to a full metadata view based on a metadata unique identifier (UUID)

**When routing is enabled the application should rely exclusively on the `RouterFacade` provided by this library in order to interact with the search state
or display full metadata records.** For example:

```typescript
import { Component } from '@angular/core'
import { RouterFacade } from '@geonetwork-ui/feature/search'
import { CatalogRecord } from '@geonetwork-ui/common/domain/record'

@Component({
  // ...
})
export class MainSearchComponent {
  constructor(private searchRouter: RouterFacade) {}

  onMetadataSelection(metadata: CatalogRecord): void {
    this.searchRouter.goToMetadata(metadata)
  }
}
```

This is required otherwise the URL won't reflect the user actions and will not be in sync with the application state.

Also please note that when using routing **it is assumed that displaying search results and displaying a catalog record
are mutually exclusive**: triggering a search will close the current record.
