import { FeatureCollection } from 'geojson'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import GeoJSON from 'ol/format/GeoJSON'
import {
  MAP_CTX_LAYER_GEOJSON_FIXTURE,
  MAP_CTX_LAYER_GEOJSON_REMOTE_FIXTURE,
  MAP_CTX_LAYER_WMS_FIXTURE,
  MAP_CTX_LAYER_XYZ_FIXTURE,
} from './map-context.fixtures'

import { MapContextService } from './map-context.service'

describe('MapContextService', () => {
  let service: MapContextService

  beforeEach(() => {
    service = new MapContextService()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#getContextLayerFromConfig', () => {
    let layerModel, layer
    describe('XYZ', () => {
      beforeEach(() => {
        layerModel = MAP_CTX_LAYER_XYZ_FIXTURE
        layer = service.getContextLayerFromConfig(layerModel)
      })
      it('create a tile layer', () => {
        expect(layer).toBeTruthy()
        expect(layer).toBeInstanceOf(TileLayer)
      })
      it('create a XYZ source', () => {
        const source = layer.getSource()
        expect(source).toBeInstanceOf(XYZ)
      })
      it('set correct urls', () => {
        const source = layer.getSource()
        const urls = source.getUrls()
        expect(urls.length).toBe(3)
        expect(urls[0]).toEqual(
          'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
        )
      })
    })
    describe('WMS', () => {
      beforeEach(() => {
        layerModel = MAP_CTX_LAYER_WMS_FIXTURE
        layer = service.getContextLayerFromConfig(layerModel)
      })
      it('create a tile layer', () => {
        expect(layer).toBeTruthy()
        expect(layer).toBeInstanceOf(TileLayer)
      })
      it('create a TileWMS source', () => {
        const source = layer.getSource()
        expect(source).toBeInstanceOf(TileWMS)
      })
      it('set correct WMS params', () => {
        const source = layer.getSource()
        const params = source.getParams()
        expect(params.LAYERS).toBe(layerModel.name)
      })
      it('set correct url', () => {
        const source = layer.getSource()
        const urls = source.getUrls()
        expect(urls.length).toBe(1)
        expect(urls[0]).toEqual(layerModel.url)
      })
      it('set WMS gutter of 20px', () => {
        const source = layer.getSource()
        const gutter = source.gutter_
        expect(gutter).toBe(20)
      })
    })

    describe('GEOJSON', () => {
      describe('with inline data', () => {
        beforeEach(() => {
          layerModel = MAP_CTX_LAYER_GEOJSON_FIXTURE
          layer = service.getContextLayerFromConfig(layerModel)
        })
        it('create a VectorLayer', () => {
          expect(layer).toBeTruthy()
          expect(layer).toBeInstanceOf(VectorLayer)
        })
        it('create a VectorSource source', () => {
          const source = layer.getSource()
          expect(source).toBeInstanceOf(VectorSource)
        })
        it('add features', () => {
          const source = layer.getSource()
          const features = source.getFeatures()
          expect(features.length).toBe(layerModel.data.features.length)
        })
      })
      describe('with inline data as string', () => {
        beforeEach(() => {
          layerModel = { ...MAP_CTX_LAYER_GEOJSON_FIXTURE }
          layerModel.data = JSON.stringify(layerModel.data)
          layer = service.getContextLayerFromConfig(layerModel)
        })
        it('create a VectorLayer', () => {
          expect(layer).toBeTruthy()
          expect(layer).toBeInstanceOf(VectorLayer)
        })
        it('create a VectorSource source', () => {
          const source = layer.getSource()
          expect(source).toBeInstanceOf(VectorSource)
        })
        it('add features', () => {
          const source = layer.getSource()
          const features = source.getFeatures()
          expect(features.length).toBe(
            (MAP_CTX_LAYER_GEOJSON_FIXTURE.data as FeatureCollection).features
              .length
          )
        })
      })
      describe('with invalid inline data as string', () => {
        beforeEach(() => {
          const spy = jest.spyOn(global.console, 'warn')
          spy.mockClear()
          layerModel = { ...MAP_CTX_LAYER_GEOJSON_FIXTURE, data: 'blargz' }
          layer = service.getContextLayerFromConfig(layerModel)
        })
        it('create a VectorLayer', () => {
          expect(layer).toBeTruthy()
          expect(layer).toBeInstanceOf(VectorLayer)
        })
        it('outputs error in the console', () => {
          expect(global.console.warn).toHaveBeenCalled()
        })
        it('create an empty VectorSource source', () => {
          const source = layer.getSource()
          expect(source).toBeInstanceOf(VectorSource)
          expect(source.getFeatures().length).toBe(0)
        })
      })
      describe('with remote file url', () => {
        beforeEach(() => {
          layerModel = MAP_CTX_LAYER_GEOJSON_REMOTE_FIXTURE
          layer = service.getContextLayerFromConfig(layerModel)
        })
        it('create a VectorLayer', () => {
          expect(layer).toBeTruthy()
          expect(layer).toBeInstanceOf(VectorLayer)
        })
        it('create a VectorSource source', () => {
          const source = layer.getSource()
          expect(source).toBeInstanceOf(VectorSource)
        })
        it('sets the format as GeoJSON', () => {
          const source = layer.getSource()
          expect(source.getFormat()).toBeInstanceOf(GeoJSON)
        })
        it('set the url to point to the file', () => {
          const source = layer.getSource()
          expect(source.getUrl()).toBe(layerModel.url)
        })
      })
    })
  })
})
