import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Style } from 'ol/style'
import View from 'ol/View'
import {
  DEFAULT_STYLE_FIXTURE,
  DEFAULT_STYLE_HL_FIXTURE,
} from '../style/map-style.fixtures'
import { MapStyleService } from '../style/map-style.service'
import {
  MAP_CTX_FIXTURE,
  MAP_CTX_LAYER_GEOJSON_FIXTURE,
  MAP_CTX_LAYER_WMS_FIXTURE,
  MAP_CTX_LAYER_XYZ_FIXTURE,
  MAP_CTX_VIEW_FIXTURE,
} from './map-context.fixtures'

import { MapContextService } from './map-context.service'

const mapStyleServiceMock = {
  createDefaultStyle: jest.fn(() => new Style()),
  styles: {
    default: DEFAULT_STYLE_FIXTURE,
    defaultHL: DEFAULT_STYLE_HL_FIXTURE,
  },
}
describe('MapContextService', () => {
  let service: MapContextService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MapStyleService,
          useValue: mapStyleServiceMock,
        },
      ],
    })
    service = TestBed.inject(MapContextService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#createLayer', () => {
    let layerModel, layer
    describe('XYZ', () => {
      beforeEach(() => {
        layerModel = MAP_CTX_LAYER_XYZ_FIXTURE
        layer = service.createLayer(layerModel)
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
        layer = service.createLayer(layerModel)
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
    })

    describe('GEOJSON', () => {
      beforeEach(() => {
        layerModel = MAP_CTX_LAYER_GEOJSON_FIXTURE
        layer = service.createLayer(layerModel)
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
  })

  describe('#createView', () => {
    let view
    const viewModel = MAP_CTX_VIEW_FIXTURE
    beforeEach(() => {
      view = service.createView(viewModel)
    })
    it('create a view', () => {
      expect(view).toBeTruthy()
      expect(view).toBeInstanceOf(View)
    })
    it('set center', () => {
      const center = view.getCenter()
      expect(center).toEqual(viewModel.center)
    })
    it('set zoom', () => {
      const center = view.getZoom()
      expect(center).toEqual(viewModel.zoom)
    })
  })
  describe('#resetMapFromContext', () => {
    const map = new Map({})
    const mapContext = MAP_CTX_FIXTURE
    beforeEach(() => {
      service.resetMapFromContext(map, mapContext)
    })
    it('create a map', () => {
      expect(map).toBeTruthy()
      expect(map).toBeInstanceOf(Map)
    })
    it('add layers', () => {
      const layers = map.getLayers().getArray()
      expect(layers.length).toEqual(3)
    })
    it('set view', () => {
      const view = map.getView()
      expect(view).toBeTruthy()
      expect(view).toBeInstanceOf(View)
    })
  })
})
