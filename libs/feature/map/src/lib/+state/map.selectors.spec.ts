import { MapPartialState } from './map.reducer'
import * as MapSelectors from './map.selectors'
import {
  MAP_CTX_LAYER_GEOJSON_FIXTURE,
  MAP_CTX_LAYER_WMS_FIXTURE,
} from '../map-context/map-context.fixtures'

describe('Map Selectors', () => {
  let state: MapPartialState

  beforeEach(() => {
    state = {
      map: {
        context: {
          layers: [MAP_CTX_LAYER_WMS_FIXTURE, MAP_CTX_LAYER_GEOJSON_FIXTURE],
          view: {},
        },
      },
    }
  })

  describe('getLayers', () => {
    it('returns the list of layers', () => {
      const result = MapSelectors.getMapContext(state)
      expect(result.layers.map((l) => l.title)).toEqual(['wms', 'geojson'])
    })
  })
})
