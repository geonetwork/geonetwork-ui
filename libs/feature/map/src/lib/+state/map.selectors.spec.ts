import { MapPartialState } from './map.reducer'
import * as MapSelectors from './map.selectors'
import {
  mapCtxLayerGeojsonFixture,
  mapCtxLayerWmsFixture,
} from '@geonetwork-ui/common/fixtures'

describe('Map Selectors', () => {
  let state: MapPartialState

  beforeEach(() => {
    state = {
      map: {
        context: {
          layers: [mapCtxLayerWmsFixture(), mapCtxLayerGeojsonFixture()],
          view: null,
        },
        selectedFeatures: [
          {
            type: 'Feature',
            geometry: { type: 'Point', coordinates: [0, 0] },
            properties: {},
          },
        ],
      },
    }
  })

  describe('getMapContext', () => {
    it('returns the context', () => {
      const result = MapSelectors.getMapContext(state)
      expect(result.layers.map((l) => l.type)).toEqual(['wms', 'geojson'])
    })
  })
  describe('getSelectedFeatures', () => {
    it('returns the selected features', () => {
      const result = MapSelectors.getSelectedFeatures(state)
      expect(result).toEqual([
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [0, 0] },
          properties: {},
        },
      ])
    })
  })
})
