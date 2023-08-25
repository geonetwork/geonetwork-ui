import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { FEATURE_COLLECTION_POLYGON_FIXTURE_4326 } from '@geonetwork-ui/common/fixtures'
import Feature from 'ol/Feature'
import { Polygon } from 'ol/geom'
import ImageLayer from 'ol/layer/Image'
import TileLayer from 'ol/layer/Tile'
import Map from 'ol/Map'
import ImageWMS from 'ol/source/ImageWMS'
import TileWMS from 'ol/source/TileWMS'
import XYZ from 'ol/source/XYZ'
import { Options } from 'ol/source/WMTS'
import { of } from 'rxjs'
import { MapUtilsWMSService } from './map-utils-wms.service'
import {
  dragPanCondition,
  MapUtilsService,
  mouseWheelZoomCondition,
} from './map-utils.service'
import { readFirst } from '@nx/angular/testing'
import {
  defaults,
  DragPan,
  DragRotate,
  MouseWheelZoom,
  PinchRotate,
} from 'ol/interaction'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/record'
import MapBrowserEvent from 'ol/MapBrowserEvent'

const wmsUtilsMock = {
  getLayerLonLatBBox: jest.fn(() => of([1.33, 48.81, 4.3, 51.1])),
}
const wmsTileLayer = new TileLayer({
  source: new TileWMS({
    url: 'url',
    params: { LAYERS: 'layerName' },
  }),
})

const wmsImageLayer = new ImageLayer({
  source: new ImageWMS({
    url: 'url',
    params: { LAYERS: 'layerName' },
  }),
})
const xyzLayer = new TileLayer({
  source: new XYZ({
    url: 'url',
  }),
})

describe('MapUtilsService', () => {
  let service: MapUtilsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MapUtilsWMSService,
          useValue: wmsUtilsMock,
        },
      ],
    })
    service = TestBed.inject(MapUtilsService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  describe('#readFeatureCollection', () => {
    const collection = FEATURE_COLLECTION_POLYGON_FIXTURE_4326
    let olFeatures, featureSample: Feature<Polygon>
    describe('when no option', () => {
      beforeEach(() => {
        olFeatures = service.readFeatureCollection(collection)
        featureSample = olFeatures[0]
      })
      it('returns an array of ol Features', () => {
        expect(olFeatures).toBeInstanceOf(Array)
        expect(olFeatures.length).toBe(collection.features.length)
        expect(olFeatures.length).toBe(collection.features.length)
        expect(featureSample).toBeInstanceOf(Feature)
      })
      it('output data in 3857', () => {
        expect(
          featureSample.getGeometry().getLinearRing(0).getFirstCoordinate()
        ).toEqual([353183.8433283152, 6448353.725194501])
      })
    })
    describe('when featureProjection = 4326', () => {
      beforeEach(() => {
        olFeatures = service.readFeatureCollection(collection, 'EPSG:4326')
        featureSample = olFeatures[0]
      })
      it('output data in 4326', () => {
        expect(
          featureSample.getGeometry().getLinearRing(0).getFirstCoordinate()
        ).toEqual([3.172704445659, 50.011996744997])
      })
    })
  })

  describe('#isWMSLayer', () => {
    let layer
    describe('when WMS tile layer', () => {
      beforeEach(() => {
        layer = wmsTileLayer
      })
      it('returns true', () => {
        expect(service.isWMSLayer(layer)).toBe(true)
      })
    })
    describe('when WMS image layer', () => {
      beforeEach(() => {
        layer = wmsImageLayer
      })
      it('returns true', () => {
        expect(service.isWMSLayer(layer)).toBe(true)
      })
    })
    describe('when XYZ layer', () => {
      beforeEach(() => {
        layer = xyzLayer
      })
      it('returns false', () => {
        expect(service.isWMSLayer(layer)).toBe(false)
      })
    })
  })

  describe('#getGFIUrl', () => {
    let url
    const coordinate = [-182932.49329334166, 6125319.813853541]
    const viewMock = {
      getProjection: jest.fn(() => 'EPSG:3857'),
      getResolution: jest.fn(() => 30000),
    }
    const mapMock = {
      getView: jest.fn(() => viewMock),
    }
    beforeEach(() => {
      url = service.getGFIUrl(wmsImageLayer, mapMock, coordinate)
    })
    it('returns true', () => {
      expect(url).toEqual(
        'url?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=layerName&LAYERS=layerName&INFO_FORMAT=application%2Fjson&I=50&J=50&CRS=EPSG%3A3857&STYLES=&WIDTH=101&HEIGHT=101&BBOX=-1697932.4932933417%2C4610319.813853541%2C1332067.5067066583%2C7640319.813853541'
      )
    })
  })

  describe('#createEmptyMap', () => {
    let map
    beforeEach(() => {
      map = service.createEmptyMap()
    })
    it('creates map', () => {
      expect(map).toBeInstanceOf(Map)
    })
    it('with no control', () => {
      expect(map.getControls().getArray().length).toBe(0)
    })
    it('with no layer', () => {
      expect(map.getLayers().getArray().length).toBe(0)
    })
  })

  describe('#getLayerExtent', () => {
    describe('geojson layer', () => {
      let layer
      beforeEach(() => {
        layer = {
          type: 'geojson',
          data: FEATURE_COLLECTION_POLYGON_FIXTURE_4326,
        }
      })
      it('returns an observable emitting the aggregated extent', async () => {
        const extent = await readFirst(service.getLayerExtent(layer))
        expect(extent).toEqual([
          -571959.6817241046, 5065908.545923665, 1064128.2009725596,
          6636971.049871371,
        ])
      })
    })
    describe('geojson layer with invalid geometry', () => {
      let layer
      beforeEach(() => {
        layer = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [NaN, NaN] },
                properties: { code: '02', nom: 'Aisne' },
              },
            ],
          },
        }
      })
      it('returns an observable emitting null', async () => {
        const extent = await readFirst(service.getLayerExtent(layer))
        expect(extent).toEqual(null)
      })
    })
    describe('WMS layer', () => {
      let layer
      describe('extent available in capabilities', () => {
        beforeEach(() => {
          layer = {
            type: 'wms',
            name: 'mock',
            url: 'http://mock/wms',
          }
        })
        it('returns an observable emitting the advertised extent', async () => {
          const extent = await readFirst(service.getLayerExtent(layer))
          expect(extent).toEqual([
            148054.92275505388, 6242683.64671384, 478673.81041107635,
            6639001.66376131,
          ])
        })
      })
    })
  })

  describe('#prioritizePageScroll', () => {
    const interactions = defaults()
    let dragRotate
    let pinchRotate
    beforeEach(() => {
      service.prioritizePageScroll(interactions)
    })
    it('adds condition to DragPan', () => {
      const dragPan = interactions
        .getArray()
        .find((interaction) => interaction instanceof DragPan)
      expect(dragPan.condition_).toEqual(dragPanCondition)
    })
    it('adds condition to MouseWheelZoom', () => {
      const mouseWheelZoom = interactions
        .getArray()
        .find((interaction) => interaction instanceof MouseWheelZoom)
      expect(mouseWheelZoom.condition_).toEqual(mouseWheelZoomCondition)
    })
    describe('interactions', () => {
      beforeEach(() => {
        interactions.forEach((interaction) => {
          if (interaction instanceof DragRotate) {
            dragRotate = interaction
          }
          if (interaction instanceof PinchRotate) {
            pinchRotate = interaction
          }
        })
      })
      it('with no DragRotate interaction', () => {
        expect(dragRotate).toBeFalsy()
      })
      it('with no PinchRotate interaction', () => {
        expect(pinchRotate).toBeFalsy()
      })
    })
  })

  describe('#dragPanCondition', () => {
    let interaction: DragPan
    beforeEach(() => {
      interaction = new DragPan()
      const map = new Map({})
      map.addInteraction(interaction)
    })

    it('returns true for a left click without modifier key', () => {
      const nativeEvent = {
        type: 'pointer',
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
      }
      const event = new MapBrowserEvent(
        'pointer',
        interaction.getMap(),
        nativeEvent as PointerEvent
      )

      expect(dragPanCondition.bind(interaction)(event)).toBe(true)
    })
    it('returns false for a left click with modifier key', () => {
      const nativeEvent = {
        type: 'pointer',
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
        shiftKey: true,
      }
      const event = new MapBrowserEvent(
        'pointer',
        interaction.getMap(),
        nativeEvent as PointerEvent
      )

      expect(dragPanCondition.bind(interaction)(event)).toBe(false)
    })
  })

  const SAMPLE_WMTS_LINK = {
    name: 'GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR10',
    url: new URL('http://my.server.org/wmts'),
    type: 'service',
    accessServiceProtocol: 'wmts',
  } as DatasetServiceDistribution
  const SAMPLE_WMTS_CAPABILITIES = `<?xml version="1.0" encoding="UTF-8"?>
<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://schemas.opengis.net/wmts/1.0/wmtsGetCapabilities_response.xsd">
  <ows:OperationsMetadata>
    <ows:Operation name="GetTile">
      <ows:DCP>
        <ows:HTTP>
          <ows:Get xlink:href="https://wxs.ign.fr/cartes/geoportail/wmts?">
            <ows:Constraint name="GetEncoding">
              <ows:AllowedValues>
                <ows:Value>KVP</ows:Value>
              </ows:AllowedValues>
            </ows:Constraint>
          </ows:Get>
        </ows:HTTP>
      </ows:DCP>
    </ows:Operation>
  </ows:OperationsMetadata>
  <Contents>
    <Layer>
      <ows:Title>Carte de l'état-major - environs de Paris (1818 - 1824)</ows:Title>
      <ows:Abstract>Carte des environs de Paris au 1 : 10 000 établie entre 1818 et 1824.</ows:Abstract>
      <ows:WGS84BoundingBox>
        <ows:LowerCorner>1.82682 48.3847</ows:LowerCorner>
        <ows:UpperCorner>2.79738 49.5142</ows:UpperCorner>
      </ows:WGS84BoundingBox>
      <ows:Identifier>GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR10</ows:Identifier>
      <Format>image/jpeg</Format>
      <Style isDefault="true">
        <ows:Title>Légende générique</ows:Title>
        <ows:Abstract>
          Fichier de légende générique – pour la compatibilité avec certains systèmes
        </ows:Abstract>
        <ows:Identifier>normal</ows:Identifier>
        <LegendURL format="image/jpeg" height="200" maxScaleDenominator="100000000" minScaleDenominator="200" width="200" xlink:href="https://wxs.ign.fr/static/legends/LEGEND.jpg"/>
      </Style>
      <TileMatrixSetLink>
        <TileMatrixSet>PM</TileMatrixSet>
        <TileMatrixSetLimits>
          <TileMatrixLimits>
            <TileMatrix>6</TileMatrix>
            <MinTileRow>21</MinTileRow>
            <MaxTileRow>22</MaxTileRow>
            <MinTileCol>32</MinTileCol>
            <MaxTileCol>32</MaxTileCol>
          </TileMatrixLimits>
          <TileMatrixLimits>
            <TileMatrix>7</TileMatrix>
            <MinTileRow>43</MinTileRow>
            <MaxTileRow>44</MaxTileRow>
            <MinTileCol>64</MinTileCol>
            <MaxTileCol>64</MaxTileCol>
          </TileMatrixLimits>
          <TileMatrixLimits>
            <TileMatrix>8</TileMatrix>
            <MinTileRow>87</MinTileRow>
            <MaxTileRow>88</MaxTileRow>
            <MinTileCol>129</MinTileCol>
            <MaxTileCol>129</MaxTileCol>
          </TileMatrixLimits>
        </TileMatrixSetLimits>
      </TileMatrixSetLink>
    </Layer>
    <TileMatrixSet>
      <ows:Identifier>PM</ows:Identifier>
      <ows:SupportedCRS>EPSG:3857</ows:SupportedCRS>
      <TileMatrix>
        <ows:Identifier>0</ows:Identifier>
        <ScaleDenominator>559082264.0287178958533332</ScaleDenominator>
        <TopLeftCorner>
          -20037508.3427892476320267 20037508.3427892476320267
        </TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>1</MatrixWidth>
        <MatrixHeight>1</MatrixHeight>
      </TileMatrix>
      <TileMatrix>
        <ows:Identifier>1</ows:Identifier>
        <ScaleDenominator>279541132.0143588959472254</ScaleDenominator>
        <TopLeftCorner>
          -20037508.3427892476320267 20037508.3427892476320267
        </TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>2</MatrixWidth>
        <MatrixHeight>2</MatrixHeight>
      </TileMatrix>
      <TileMatrix>
        <ows:Identifier>2</ows:Identifier>
        <ScaleDenominator>139770566.0071793960087234</ScaleDenominator>
        <TopLeftCorner>
        -20037508.3427892476320267 20037508.3427892476320267
        </TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>4</MatrixWidth>
        <MatrixHeight>4</MatrixHeight>
      </TileMatrix>
      <TileMatrix>
        <ows:Identifier>3</ows:Identifier>
        <ScaleDenominator>69885283.0035897239868063</ScaleDenominator>
        <TopLeftCorner>
          -20037508.3427892476320267 20037508.3427892476320267
        </TopLeftCorner>
        <TileWidth>256</TileWidth>
        <TileHeight>256</TileHeight>
        <MatrixWidth>8</MatrixWidth>
        <MatrixHeight>8</MatrixHeight>
      </TileMatrix>
    </TileMatrixSet>
  </Contents>
</Capabilities>`

  describe('#getWmtsOptionsFromCapabilities', () => {
    let originalFetch
    beforeEach(() => {
      originalFetch = window.fetch
    })
    afterEach(() => {
      window.fetch = originalFetch
    })
    describe('nominal', () => {
      let wmtsOptions: Options
      beforeEach(async () => {
        ;(window as any).fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            text: () => Promise.resolve(SAMPLE_WMTS_CAPABILITIES),
          })
        )
        wmtsOptions = await readFirst(
          service.getWmtsOptionsFromCapabilities(SAMPLE_WMTS_LINK)
        )
      })
      it('appends query params to the URL', () => {
        expect(window.fetch).toHaveBeenCalledWith(
          'http://my.server.org/wmts?SERVICE=WMTS&REQUEST=GetCapabilities'
        )
      })
      it('returns appropriate WMTS options', () => {
        expect(wmtsOptions).toMatchObject({
          format: 'image/jpeg',
          layer: 'GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR10',
          matrixSet: 'PM',
          requestEncoding: 'KVP',
          style: 'normal',
          urls: ['https://wxs.ign.fr/cartes/geoportail/wmts?'],
        })
      })
    })
    describe('http error', () => {
      let error
      beforeEach(async () => {
        ;(window as any).fetch = jest.fn(() =>
          Promise.resolve({
            ok: false,
            status: 403,
            text: () => `<ExceptionReport xmlns="http://www.opengis.net/ows/1.1">
<Exception exceptionCode="InvalidParameterValue" >
  Le service est inconnu pour ce serveur.
</Exception>
</ExceptionReport>`,
          })
        )
        try {
          await readFirst(
            service.getWmtsOptionsFromCapabilities(SAMPLE_WMTS_LINK)
          )
        } catch (e) {
          error = e
        }
      })
      it('throws an explicit error', () => {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toMatch('request failed')
      })
    })
    describe('parsing error', () => {
      let error
      beforeEach(async () => {
        ;(window as any).fetch = jest.fn(() =>
          Promise.resolve({
            ok: true,
            status: 200,
            text: () =>
              Promise.resolve(
                '{ "response": "This is probably not what you expected!" }'
              ),
          })
        )
        try {
          await readFirst(
            service.getWmtsOptionsFromCapabilities(SAMPLE_WMTS_LINK)
          )
        } catch (e) {
          error = e
        }
      })
      it('throws an explicit error', () => {
        expect(error).toBeInstanceOf(Error)
        expect(error.message).toMatch('parsing failed')
      })
    })
  })
})
