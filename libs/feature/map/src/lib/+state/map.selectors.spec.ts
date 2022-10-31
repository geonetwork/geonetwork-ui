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
        layers: [
          {
            ...MAP_CTX_LAYER_WMS_FIXTURE,
            title: 'wms',
            error: null,
            loading: false,
          },
          {
            ...MAP_CTX_LAYER_GEOJSON_FIXTURE,
            title: 'geojson',
            error: null,
            loading: false,
          },
        ],
      },
    }
  })

  describe('getLayers', () => {
    it('returns the list of layers', () => {
      const results = MapSelectors.getMapLayers(state)
      expect(results.length).toBe(2)
      expect(results.map((l) => l.title)).toEqual(['wms', 'geojson'])
    })
  })
})
