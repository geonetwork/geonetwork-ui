# feature-router

## Overview

This library provides tools to handle routing within the applications.
A defaut router is implemented to manage the search state and the record view state.

- `/search` to be on search result page
- `/metadata/cf5048f6-5bbf-4e44-ba74-e6f429af51ea` to be on the details of the record page.

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

2. On a dispatch of an external `RequestMoreResult` action, the router changes the route to `/search`

```ts
search$ = createEffect(() =>
  this._actions$.pipe(
    ofType(REQUEST_MORE_RESULTS),
    filter(
      (action: RequestMoreResults) =>
        action.id === this.routerConfig.searchStateId
    ),
    map((action) =>
      goAction({
        path: 'search',
      })
    )
  )
)
```
