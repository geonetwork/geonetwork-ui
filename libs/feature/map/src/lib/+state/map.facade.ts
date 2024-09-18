import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as MapSelectors from './map.selectors'
import * as MapActions from './map.actions'
import { MapContext } from '@geospatial-sdk/core'
import { Feature } from 'geojson'

@Injectable()
export class MapFacade {
  context$ = this.store.pipe(select(MapSelectors.getMapContext))
  selectedFeatures$ = this.store.pipe(select(MapSelectors.getSelectedFeatures))

  constructor(private readonly store: Store) {}

  applyContext(context: MapContext) {
    this.store.dispatch(MapActions.setContext({ context }))
  }

  selectFeatures(selectedFeatures: Feature[]) {
    this.store.dispatch(MapActions.setSelectedFeatures({ selectedFeatures }))
  }

  clearFeatureSelection() {
    this.store.dispatch(MapActions.clearSelectedFeatures())
  }
}
