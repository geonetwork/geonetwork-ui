import * as MapActions from './map.actions'
import { initialMapState, mapReducer, MapState } from './map.reducer'
import { MapContextLayer } from '@geospatial-sdk/core'
import { mapCtxLayerWmsFixture } from '@geonetwork-ui/common/fixtures'

function getSampleLayer(label: string): MapContextLayer {
  return { ...mapCtxLayerWmsFixture(), label }
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
      expect(result.context.layers.map((l) => l.label)).toEqual([
        'first',
        'second',
        'third',
      ])
    })
  })
})
