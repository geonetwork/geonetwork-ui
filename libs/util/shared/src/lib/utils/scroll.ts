import { ViewportScroller } from '@angular/common'
import { Event, NavigationEnd, Router, Scroll } from '@angular/router'
import { filter, pairwise, tap } from 'rxjs'

/**
 * When route is changed, Angular interprets a simple query params change as "forward navigation" too.
 * Using the pairwise function allows us to have both the previous and current router events, which we can
 * use to effectively compare the two navigation events and see if they actually change route, or only
 * the route parameters (i.e. search params stored in query params).
 *
 * Related to: https://github.com/angular/angular/issues/26744
 */
export function handleScrollOnNavigation(
  router: Router,
  viewportScroller: ViewportScroller
): void {
  router.events
    .pipe(
      filter((e: Event): e is Scroll => e instanceof Scroll),
      pairwise()
    )
    .subscribe(([previous, current]: [Scroll, Scroll]) => {
      if (current.position) {
        // Backward navigation
        viewportScroller.scrollToPosition(current.position)
      } else if (current.anchor) {
        // Anchor navigation
        viewportScroller.scrollToAnchor(current.anchor)
      } else {
        // Check if routes match, or if it is only a query param change
        if (
          previous.routerEvent instanceof NavigationEnd &&
          current.routerEvent instanceof NavigationEnd &&
          getBaseRoute(previous.routerEvent.urlAfterRedirects) !==
            getBaseRoute(current.routerEvent.urlAfterRedirects)
        ) {
          // Routes don't match, this is actual forward navigation
          // Default behavior: scroll to top
          viewportScroller.scrollToPosition([0, 0])
        }
      }
    })
}

function getBaseRoute(url: string): string {
  // return url without query params
  return url.split('?')[0]
}
