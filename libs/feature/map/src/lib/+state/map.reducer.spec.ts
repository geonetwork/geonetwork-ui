import * as MapActions from './map.actions'
import { initialMapState, mapReducer, MapState } from './map.reducer'
import { MAP_CTX_LAYER_WMS_FIXTURE } from '../map-context/map-context.fixtures'
import { MapContextLayer } from '@geospatial-sdk/core'

function getSampleLayer(title: string): MapContextLayer {
  return { ...MAP_CTX_LAYER_WMS_FIXTURE, title }
}

describe('Map Reducer', () => {
  let initialState: MapState

  beforeEach(() => {
    initialState = {
      ...initialMapState,
    }
  })

  describe('setContext', () => {
    it('should add a layer at the end of the list if no index specified', () => {
      const action = MapActions.setContext({
        context: {
          ...initialMapState.context,
          layers: [
            getSampleLayer('first'),
            getSampleLayer('second'),
            getSampleLayer('third'),
          ],
        },
      })
      const result: MapState = mapReducer(initialState, action)
      expect(result.context.layers.map((l) => l.title)).toEqual([
        'first',
        'second',
        'third',
      ])
    })
  })
})
