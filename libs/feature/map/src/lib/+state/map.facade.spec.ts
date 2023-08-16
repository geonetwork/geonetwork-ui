import { NgModule } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { EffectsModule } from '@ngrx/effects'
import { Store, StoreModule } from '@ngrx/store'
import { readFirst } from '@nx/angular/testing'
import { MapEffects } from './map.effects'
import { MapFacade } from './map.facade'
import { MAP_FEATURE_KEY, mapReducer, MapState } from './map.reducer'
import { MAP_CTX_LAYER_WMS_FIXTURE } from '../map-context/map-context.fixtures'

interface TestSchema {
  map: MapState
}

describe('MapFacade', () => {
  let facade: MapFacade
  let store: Store<TestSchema>

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MAP_FEATURE_KEY, mapReducer),
          EffectsModule.forFeature([MapEffects]),
        ],
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

    describe('layers$ / addLayer / addLayerAtIndex', () => {
      it('emits the list of layers after each change', async () => {
        let list = await readFirst(facade.layers$)
        expect(list.length).toBe(0)

        facade.addLayer({
          ...MAP_CTX_LAYER_WMS_FIXTURE,
          title: 'world',
        })

        list = await readFirst(facade.layers$)
        expect(list.length).toBe(1)
        expect(list.map((l) => l.title)).toEqual(['world'])

        facade.addLayerAtIndex(
          {
            ...MAP_CTX_LAYER_WMS_FIXTURE,
            title: 'hello',
          },
          0
        )

        list = await readFirst(facade.layers$)
        expect(list.length).toBe(2)
        expect(list.map((l) => l.title)).toEqual(['hello', 'world'])
      })
    })
  })
})
