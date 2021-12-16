import { Injectable } from '@angular/core'
import { MdViewActions } from '@geonetwork-ui/feature/record'
import { MetadataRecord } from '@geonetwork-ui/util/shared'
import { RouterReducerState } from '@ngrx/router-store'
import { select, Store } from '@ngrx/store'
import { filter, take } from 'rxjs/operators'
import { ROUTER_ROUTE_DATASET, ROUTER_ROUTE_SEARCH } from '../constants'
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
  fullUrl$ = this.store.pipe(select(selectUrl))

  constructor(private store: Store<RouterReducerState>) {}

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

  goToSearch() {
    this.go({
      path: `${ROUTER_ROUTE_SEARCH}/`,
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
