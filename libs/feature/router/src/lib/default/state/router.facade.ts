import { Injectable } from '@angular/core'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { RouterReducerState } from '@ngrx/router-store'
import { select, Store } from '@ngrx/store'
import { distinctUntilChanged, filter, map, pluck, take } from 'rxjs/operators'
import {
  ROUTE_PARAMS,
  ROUTER_ROUTE_DATASET,
  ROUTER_ROUTE_SEARCH,
  SearchRouteParams,
} from '../constants'
import {
  backAction,
  forwardAction,
  goAction,
  RouterGoActionPayload,
} from './router.actions'
import {
  selectCurrentRoute,
  selectQueryParams,
  selectRouteParams,
  selectUrl,
} from './router.selectors'

@Injectable()
export class RouterFacade {
  currentRoute$ = this.store.pipe(select(selectCurrentRoute))
  queryParams$ = this.store.pipe(select(selectQueryParams))
  pathParams$ = this.store.pipe(select(selectRouteParams))

  anySearch$ = this.queryParams$.pipe(
    filter((params) =>
      Object.prototype.hasOwnProperty.call(params, ROUTE_PARAMS.ANY)
    ),
    pluck(ROUTE_PARAMS.ANY)
  )

  searchParams$ = this.currentRoute$.pipe(
    filter((route) => !!route),
    filter((route) => route.url[0]?.path.startsWith(ROUTER_ROUTE_SEARCH)),
    map((route) => route.queryParams),
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  )

  constructor(private store: Store<RouterReducerState>) {
    console.log('routerFacade')
  }

  goToMetadata(metadata: MetadataRecord) {
    this.pathParams$
      .pipe(
        take(1),
        filter((params) => params.metadataUuid !== metadata.uuid)
      )
      .subscribe(() => {
        this.go({
          path: `${ROUTER_ROUTE_DATASET}/${metadata.uuid}`,
        })
        this.store.dispatch(
          MdViewActions.setIncompleteMetadata({ incomplete: metadata })
        )
      })
  }

  goToSearch(q?: string) {
    this.go({
      path: `${ROUTER_ROUTE_SEARCH}/`,
      ...(q && { query: { q } }),
    })
  }

  go(payload: RouterGoActionPayload) {
    this.store.dispatch(goAction(payload))
  }

  back() {
    this.store.dispatch(backAction())
  }

  forward() {
    this.store.dispatch(forwardAction())
  }
}
