import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as MapSelectors from './map.selectors'
import * as MapActions from './map.actions'
import { MapContext } from '@geospatial-sdk/core'

@Injectable()
export class MapFacade {
  context$ = this.store.pipe(select(MapSelectors.getMapContext))

  constructor(private readonly store: Store) {}

  applyContext(context: MapContext) {
    this.store.dispatch(MapActions.setContext({ context }))
  }
}
