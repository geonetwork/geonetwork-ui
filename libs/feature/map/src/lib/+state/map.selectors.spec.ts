import { MapPartialState } from './map.reducer'
import * as MapSelectors from './map.selectors'
import {
  mapCtxLayerGeojsonFixture,
  mapCtxLayerWmsFixture,
} from '../map-context/map-context.fixtures'

describe('Map Selectors', () => {
  let state: MapPartialState

  beforeEach(() => {
    state = {
      map: {
        layers: [
          {
            ...mapCtxLayerWmsFixture(),
            title: 'wms',
            error: null,
            loading: false,
          },
          {
            ...mapCtxLayerGeojsonFixture(),
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
