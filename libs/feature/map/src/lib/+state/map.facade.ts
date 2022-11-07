import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as MapSelectors from './map.selectors'
import { MapLayer } from './map.models'
import * as MapActions from './map.actions'

@Injectable()
export class MapFacade {
  layers$ = this.store.pipe(select(MapSelectors.getMapLayers))

  constructor(private readonly store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    // placeholder
  }

  addLayer(layer: MapLayer) {
    this.store.dispatch(MapActions.addLayer({ layer }))
  }
  addLayerAtIndex(layer: MapLayer, index: number) {
    this.store.dispatch(MapActions.addLayer({ layer, atIndex: index }))
  }
  removeLayer(index: number) {
    this.store.dispatch(MapActions.removeLayer({ index }))
  }
}
