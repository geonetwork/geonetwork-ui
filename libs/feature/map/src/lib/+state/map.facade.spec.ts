import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { Store, StoreModule } from '@ngrx/store'
import { MapFacade } from './map.facade'
import * as MapActions from './map.actions'
import { MAP_FEATURE_KEY, mapReducer, MapState } from './map.reducer'
import { mapCtxLayerWmsFixture } from '@geonetwork-ui/common/fixtures'

interface TestSchema {
  map: MapState
}

describe('MapFacade', () => {
  let facade: MapFacade
  let store: Store<TestSchema>

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(MAP_FEATURE_KEY, mapReducer)],
        providers: [MapFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] })

      store = TestBed.inject(Store)
      facade = TestBed.inject(MapFacade)
    })

    describe('setContext', () => {
      it('dispatches a setContext action', async () => {
        const spy = jest.spyOn(store, 'dispatch')
        const context = {
          layers: [mapCtxLayerWmsFixture()],
          view: null,
        }

        facade.applyContext(context)

        const action = MapActions.setContext({ context })
        expect(spy).toHaveBeenCalledWith(action)
      })
    })
  })
})
