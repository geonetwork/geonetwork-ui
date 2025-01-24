# feature-router

## Overview

This library provides tools to handle routing within the applications.
A defaut router is implemented to manage the search state and the record view state.

- `/search` to be on search result page
- `/search?q=island` search for `any=island`
- `/search?publisher=island` search for `OrgForResource=island`
- `/dataset/cf5048f6-5bbf-4e44-ba74-e6f429af51ea` to be on the details of the record page.

## Principle

No library should import the router library, but the router library should implement the interactions between other libraries in the `feature-router` library itself.

The router is based on a `RouterStore`, so it reacts on actions.

The interactions with other libraries should be done in the `router.effects` class to react to or dispatch external actions.

Examples of both direction interactions

1. On a route change to a record uuid, the `DefaultRouter` dispatches an external load full record action.

```ts
navigateToMetadata$ = createEffect(() =>
  this._actions$.pipe(
    navigation(MetadataRouteComponent, {
      run: (activatedRouteSnapshot: ActivatedRouteSnapshot) =>
        MdViewActions.loadFullMetadata({
          uuid: activatedRouteSnapshot.params.metadataUuid,
        }),
      onError(a: ActivatedRouteSnapshot, e) {
        console.error('Navigation failed', e)
      },
    })
  )
)
```

2. On a route change to new search filters, it forwards those filters to the search state

```ts
navigateWithFieldSearch$ = createEffect(() => this.facade.searchParams$.pipe(map((filters) => new SetFilters(routeParamsToState(filters), this.routerConfig.searchStateId))))
```

## Search

A service `SearchService` is introduced to create an abstraction on search interactions.
By default `SearchService` searches through the search state.

If you use the router in your application, all search commands should go through the router instead
of the search state. The router effect mentioned above is responsible to forward route search filters to the search state.

You need to provide the `RouterSearchService` as an implementation of `SearchService`, which is done by default in `gnUiSearchRouterContainer` directive.

```js
{
  provide: SearchService,
  useClass: RouterSearchService,
}
```

Load `gnUiSearchRouterContainer` directive at the root of your application DOM to initiate the search state facade and to use the `RouterSearchService`.

The mapping between search state and router state is done via a mapping object. You must update it to handle other keys.

```js
export enum ROUTE_PARAMS {
  ANY = 'q',
  PUBLISHER = 'publisher',
}
export type SearchRouteParams = Partial<Record<ROUTE_PARAMS, string>>
export const ROUTE_PARAMS_MAPPING: SearchRouteParams = {
  [ROUTE_PARAMS.ANY]: 'any',
  [ROUTE_PARAMS.PUBLISHER]: 'OrgForResource',
}
```
