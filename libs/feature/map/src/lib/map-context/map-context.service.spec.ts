import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { MAP_CONFIG_FIXTURE } from '@geonetwork-ui/util/app-config'
import { FeatureCollection } from 'geojson'
import { Geometry } from 'ol/geom'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import Map from 'ol/Map'
import TileWMS from 'ol/source/TileWMS'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { Style } from 'ol/style'
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON'
import {
  DEFAULT_STYLE_FIXTURE,
  DEFAULT_STYLE_HL_FIXTURE,
} from '../style/map-style.fixtures'
import { MapStyleService } from '../style/map-style.service'
import {
  MAP_CTX_EXTENT_FIXTURE,
  MAP_CTX_FIXTURE,
  MAP_CTX_LAYER_GEOJSON_FIXTURE,
  MAP_CTX_LAYER_GEOJSON_REMOTE_FIXTURE,
  MAP_CTX_LAYER_WFS_FIXTURE,
  MAP_CTX_LAYER_WMS_FIXTURE,
  MAP_CTX_LAYER_XYZ_FIXTURE,
} from './map-context.fixtures'

import {
  DEFAULT_BASELAYER_CONTEXT,
  DEFAULT_VIEW,
  MapContextService,
} from './map-context.service'

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
        ;(layerModel = MAP_CTX_LAYER_WMS_FIXTURE),
          (layer = service.createLayer(layerModel))
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
      it('set correct url without existing REQUEST and SERVICE params', () => {
        const source = layer.getSource()
        const urls = source.getUrls()
        expect(urls.length).toBe(1)
        expect(urls[0]).toBe(
          'https://www.geograndest.fr/geoserver/region-grand-est/ows'
        )
      })
      it('set WMS gutter of 20px', () => {
        const source = layer.getSource()
        const gutter = source.gutter_
        expect(gutter).toBe(20)
      })
    })

    describe('WFS', () => {
      beforeEach(() => {
        ;(layerModel = MAP_CTX_LAYER_WFS_FIXTURE),
          (layer = service.createLayer(layerModel))
      })
      it('create a vector layer', () => {
        expect(layer).toBeTruthy()
        expect(layer).toBeInstanceOf(VectorLayer)
      })
      it('create a Vector source', () => {
        const source = layer.getSource()
        expect(source).toBeInstanceOf(VectorSource)
      })
      it('set correct url load function', () => {
        const source = layer.getSource()
        const urlLoader = source.getUrl()
        expect(urlLoader([10, 20, 30, 40])).toBe(
          'https://www.geograndest.fr/geoserver/region-grand-est/ows?service=WFS&version=1.1.0&request=GetFeature&outputFormat=application%2Fjson&typename=ms%3Acommune_actuelle_3857&srsname=EPSG%3A3857&bbox=10%2C20%2C30%2C40%2CEPSG%3A3857'
        )
      })
    })

    describe('GEOJSON', () => {
      describe('with inline data', () => {
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
      describe('with inline data as string', () => {
        beforeEach(() => {
          layerModel = { ...MAP_CTX_LAYER_GEOJSON_FIXTURE }
          layerModel.data = JSON.stringify(layerModel.data)
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
          layer = service.createLayer(layerModel)
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

  describe('#createView', () => {
    describe('from center and zoom', () => {
      let view
      const contextModel = MAP_CTX_FIXTURE
      beforeEach(() => {
        view = service.createView(contextModel.view)
      })
      it('create a view', () => {
        expect(view).toBeTruthy()
        expect(view).toBeInstanceOf(View)
      })
      it('set center', () => {
        const center = view.getCenter()
        expect(center).toEqual([862726.0536478702, 6207260.308175252])
      })
      it('set zoom', () => {
        const zoom = view.getZoom()
        expect(zoom).toEqual(contextModel.view.zoom)
      })
    })
    describe('from extent', () => {
      let view
      const contextModel = MAP_CTX_FIXTURE
      contextModel.view.extent = MAP_CTX_EXTENT_FIXTURE
      const map = new Map({})
      map.setSize([100, 100])
      beforeEach(() => {
        view = service.createView(contextModel.view, map)
      })
      it('create a view', () => {
        expect(view).toBeTruthy()
        expect(view).toBeInstanceOf(View)
      })
      it('set center', () => {
        const center = view.getCenter()
        expect(center).toEqual([324027.04834895337, 6438563.654151043])
      })
      it('set zoom', () => {
        const zoom = view.getZoom()
        expect(zoom).toEqual(5)
      })
    })
  })
  describe('#resetMapFromContext', () => {
    describe('without config', () => {
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
    describe('with config', () => {
      const map = new Map({})
      const mapContext = MAP_CTX_FIXTURE
      const mapConfig = MAP_CONFIG_FIXTURE
      beforeEach(() => {
        mapConfig.DO_NOT_USE_DEFAULT_BASEMAP = true
        service.resetMapFromContext(map, mapContext, mapConfig)
      })
      it('set maxZoom', () => {
        const maxZoom = map.getView().getMaxZoom()
        expect(maxZoom).toBe(10)
      })
      it('set first layer as baselayer', () => {
        const baselayerUrls = (map.getLayers().item(0) as TileLayer<XYZ>)
          .getSource()
          .getUrls()
        expect(baselayerUrls).toEqual(['https://some-basemap-server'])
      })
      it('add one WMS layer from config on top of baselayer', () => {
        const layerWMSUrl = (map.getLayers().item(1) as TileLayer<TileWMS>)
          .getSource()
          .getUrls()[0]
        expect(layerWMSUrl).toEqual('https://some-wms-server/')
      })
      it('add one WFS layer from config on top of baselayer', () => {
        const layerWFSSource = (
          map.getLayers().item(2) as VectorLayer<VectorSource<Geometry>>
        ).getSource()
        expect(layerWFSSource).toBeInstanceOf(VectorSource)
      })
    })
    describe('with config, but keeping default basemap', () => {
      const map = new Map({})
      const mapContext = MAP_CTX_FIXTURE
      const mapConfig = MAP_CONFIG_FIXTURE
      beforeEach(() => {
        mapConfig.DO_NOT_USE_DEFAULT_BASEMAP = false
        service.resetMapFromContext(map, mapContext, mapConfig)
      })
      it('set first layer as baselayer', () => {
        const baselayerUrls = (map.getLayers().item(0) as TileLayer<XYZ>)
          .getSource()
          .getUrls()
        expect(baselayerUrls).toEqual(DEFAULT_BASELAYER_CONTEXT.urls)
      })
    })
    describe('uses default fallback view (without config)', () => {
      let view
      const map = new Map({})
      const mapContext = {
        extent: null,
        center: null,
        zoom: null,
        layers: [
          MAP_CTX_LAYER_XYZ_FIXTURE,
          MAP_CTX_LAYER_WMS_FIXTURE,
          MAP_CTX_LAYER_GEOJSON_FIXTURE,
        ],
      }
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
        view = map.getView()
        expect(view).toBeTruthy()
        expect(view).toBeInstanceOf(View)
      })
      it('set center', () => {
        const center = view.getCenter()
        expect(center).toEqual([0, 1689200.1396078935])
      })
      it('set zoom', () => {
        const zoom = view.getZoom()
        expect(zoom).toEqual(DEFAULT_VIEW.zoom)
      })
    })
    describe('uses fallback view from config', () => {
      let view
      const map = new Map({})
      const mapConfig = MAP_CONFIG_FIXTURE
      const mapContext = {
        extent: null,
        center: null,
        zoom: null,
        layers: [],
      }
      beforeEach(() => {
        service.resetMapFromContext(map, mapContext, mapConfig)
      })
      it('create a map', () => {
        expect(map).toBeTruthy()
        expect(map).toBeInstanceOf(Map)
      })
      it('add layers', () => {
        const layers = map.getLayers().getArray()
        expect(layers.length).toEqual(4)
      })
      it('set view', () => {
        view = map.getView()
        expect(view).toBeTruthy()
        expect(view).toBeInstanceOf(View)
      })
      it('set center', () => {
        const center = view.getCenter()
        expect(center).toEqual([271504.324469, 5979210.100579999])
      })
      it('set zoom', () => {
        const zoom = view.getZoom()
        expect(zoom).toEqual(3)
      })
    })
  })
  describe('#mergeMapConfigWithContext', () => {
    const mapContext = MAP_CTX_FIXTURE
    const mapConfig = MAP_CONFIG_FIXTURE
    beforeEach(() => {
      mapConfig.DO_NOT_USE_DEFAULT_BASEMAP = true
    })
    it('merges mapconfig into existing mapcontext', () => {
      const mergedMapContext = service.mergeMapConfigWithContext(
        mapContext,
        mapConfig
      )
      const layersContext = MAP_CONFIG_FIXTURE.MAP_LAYERS.map(
        service.getContextLayerFromConfig
      )

      expect(mergedMapContext).toEqual({
        ...MAP_CTX_FIXTURE,
        view: {
          ...MAP_CTX_FIXTURE.view,
          maxZoom: MAP_CONFIG_FIXTURE.MAX_ZOOM,
          maxExtent: MAP_CONFIG_FIXTURE.MAX_EXTENT,
        },
        layers: [
          layersContext[0],
          layersContext[1],
          layersContext[2],
          ...MAP_CTX_FIXTURE.layers,
        ],
      })
    })
  })
})
