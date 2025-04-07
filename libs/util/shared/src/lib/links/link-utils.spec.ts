import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import {
  checkFileFormat,
  FORMATS,
  getBadgeColor,
  getFileFormat,
  getFileFormatFromServiceOutput,
  getLayers,
  getLinkLabel,
  getLinkPriority,
  mimeTypeToFormat,
  wmsLayerFlatten,
} from './link-utils'
import { DatasetDownloadDistribution } from '@geonetwork-ui/common/domain/model/record'

const mockWmsLayer = [
  {
    name: 'wms-layer-1',
    title: 'WMS layer 1',
    abstract: 'WMS layer 1',
    children: [
      {
        name: 'wms-layer-1-1',
        title: 'WMS layer 1 - 1',
        abstract: 'WMS layer 1 - 1',
      },
    ],
  },
  {
    name: 'wms-layer-2',
    title: 'WMS layer 2',
    abstract: 'WMS layer 2',
  },
]
const mockWfsFeatureType = [
  {
    name: 'ft1',
    title: 'Feature Type 1',
  },
  {
    name: 'ft2',
    title: 'Feature Type 2',
  },
  {
    name: 'ft3',
    title: 'Feature Type 3',
  },
]

jest.mock('@camptocamp/ogc-client', () => ({
  WfsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve(this)
    }
    getFeatureTypes() {
      return mockWfsFeatureType
    }
    getFeatureTypeFull(name: string) {
      return Promise.resolve({
        name,
        title: mockWfsFeatureType.find((layer) => layer.name === name)?.title,
        abstract: mockWfsFeatureType.find((layer) => layer.name === name)
          ?.title,
      })
    }
  },
  OgcApiEndpoint: class {
    constructor(private url) {}
    get allCollections() {
      return [
        {
          name: 'ogc-collection-1',
          title: 'Ogc Collection 1',
        },
        {
          name: 'ogc-collection-2',
          title: 'Ogc Collection 2',
        },
      ]
    }
  },
  WmsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve(this)
    }
    getLayers() {
      return mockWmsLayer
    }
    getLayerByName(name: string) {
      const flattenWmsLayer = mockWmsLayer
        .flatMap(wmsLayerFlatten)
        .filter((l) => l.name)
      return {
        name,
        title: flattenWmsLayer.find((layer) => layer.name === name)?.title,
        abstract: flattenWmsLayer.find((layer) => layer.name === name)
          ?.abstract,
      }
    }
  },
  WmtsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve(this)
    }
    getLayers() {
      return [
        {
          name: 'wmts-layer-1',
          title: 'WMTS layer 1',
        },
        {
          name: 'wmts-layer-2',
          title: 'WMTS layer 2',
        },
        {
          name: 'wmts-layer-3',
          title: 'WMTS layer 3',
        },
      ]
    }
  },
}))

describe('link utils', () => {
  describe('#getFileFormat', () => {
    describe('for a csv FILE link', () => {
      it('returns csv format', () => {
        expect(getFileFormat(aSetOfLinksFixture().dataCsv())).toEqual('csv')
      })
    })
    describe('for a geojson FILE link', () => {
      it('returns geojson format', () => {
        expect(getFileFormat(aSetOfLinksFixture().geodataJson())).toEqual(
          'geojson'
        )
      })
    })
    describe('for a geojson FILE link with mime type in protocol', () => {
      it('returns geojson format', () => {
        expect(
          getFileFormat(aSetOfLinksFixture().geodataJsonWithMimeType())
        ).toEqual('geojson')
      })
    })
    describe('for a geojson FILE link with unrecognized mime type', () => {
      it('returns geojson format', () => {
        expect(
          getFileFormat({
            ...aSetOfLinksFixture().geodataJsonWithMimeType(),
            mimeType: 'unknown',
          } as DatasetDownloadDistribution)
        ).toEqual('geojson')
      })
    })
    describe('for a json FILE link', () => {
      it('returns json format', () => {
        expect(getFileFormat(aSetOfLinksFixture().dataJson())).toEqual('json')
      })
    })
    describe('for a shapefile link', () => {
      it('returns shp format', () => {
        expect(getFileFormat(aSetOfLinksFixture().geodataShp())).toEqual('shp')
      })
    })
    describe('for a shapefile link with MimeType', () => {
      it('returns shp format', () => {
        expect(
          getFileFormat(aSetOfLinksFixture().geodataShpWithMimeType())
        ).toEqual('shp')
      })
    })
    describe('for a kml FILE link', () => {
      it('returns kml format', () => {
        expect(getFileFormat(aSetOfLinksFixture().geodataKml())).toEqual('kml')
      })
    })
    describe('for a geopackage FILE link', () => {
      it('returns gpkg format', () => {
        expect(getFileFormat(aSetOfLinksFixture().geodataGpkg())).toEqual(
          'gpkg'
        )
      })
    })
    describe('for an excel FILE link', () => {
      it('returns excel format', () => {
        expect(getFileFormat(aSetOfLinksFixture().dataXlsx())).toEqual('excel')
      })
    })
    describe('for a pdf FILE link', () => {
      it('returns pdf format', () => {
        expect(getFileFormat(aSetOfLinksFixture().dataPdf())).toEqual('pdf')
      })
    })
    describe('for a jpg FILE link', () => {
      it('returns jpg format', () => {
        expect(getFileFormat(aSetOfLinksFixture().dataJpg())).toEqual('jpg')
      })
    })
    describe('for a zip FILE link', () => {
      it('returns zip format', () => {
        expect(getFileFormat(aSetOfLinksFixture().dataZip())).toEqual('zip')
      })
    })

    // format name, file extension, mime type
    const toTest = [
      ['geojson', 'geojson', 'application/geo+json'],
      [
        'excel',
        'xlsx',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
      ['csv', 'csv', 'application/csv'],
      ['svg', 'svg', 'image/svg+xml'],
    ]

    describe.each(toTest)(
      'format=%s, extension=%s, mime-type=%s',
      (format, extension, mimeType) => {
        it('from link name (extension)', () => {
          expect(
            getFileFormat({
              name: `cities.${format}`,
              url: new URL('http://example.com/data'),
              type: 'download',
            })
          ).toEqual(format)
        })
        it('from link url (extension)', () => {
          expect(
            getFileFormat({
              name: 'Cities',
              url: new URL(`http://example.com/data.${extension}`),
              type: 'download',
            })
          ).toEqual(format)
        })
        it('from link url (ending)', () => {
          expect(
            getFileFormat({
              name: 'Cities',
              url: new URL(`http://example.com/data/${extension}`),
              type: 'download',
            })
          ).toEqual(format)
        })
        it('from link url (format= param)', () => {
          expect(
            getFileFormat({
              name: 'Cities',
              url: new URL(
                `http://example.com/data?format=${extension}&abc=123`
              ),
              type: 'download',
            })
          ).toEqual(format)
        })
        it('from link url (f= param)', () => {
          expect(
            getFileFormat({
              name: 'Cities',
              url: new URL(
                `http://example.com/data?aa=bb&f=${extension}&abc=123`
              ),
              type: 'download',
            })
          ).toEqual(format)
        })
        it('from mime type', () => {
          expect(
            getFileFormat({
              name: 'Cities',
              mimeType,
              url: new URL('http://example.com/data'),
              type: 'download',
            })
          ).toEqual(format)
        })
      }
    )
  })

  describe('#getFileFormatFromServiceOutput', () => {
    // service output, recognized file format
    const toTest = [
      ['SHAPE-ZIP', 'shp'],
      ['application/vnd.google-earth.kml xml', 'kml'],
      ['KML', 'kml'],
      ['excel2007', 'excel'],
      ['XLS', 'excel'],
      ['gml2', 'gml'],
      ['gml3', 'gml'],
      ['text/xml; subtype=gml/3.1.1', 'gml'],
      ['gml32', 'gml'],
      ['DXF', 'dxf'],
      ['DXF-ZIP', 'zip'],
      ['json', 'json'],
      ['geojson', 'geojson'],
      ['Acbd', null],
    ]

    describe.each(toTest)(
      'service output=%s, recognized file format=%s',
      (serviceOutput, fileFormat) => {
        it('returns the correct file format', () => {
          expect(getFileFormatFromServiceOutput(serviceOutput)).toEqual(
            fileFormat
          )
        })
      }
    )
  })

  describe('#getBadgeColor for format', () => {
    it('returns #84D0F0', () => {
      expect(getBadgeColor('json')).toEqual('#84D0F0')
    })
    it('returns #F6A924', () => {
      expect(getBadgeColor('csv')).toEqual('#F6A924')
    })
  })
  describe('#sortPriority from formats object', () => {
    const nFormats = Object.keys(FORMATS).length
    it(`returns ${nFormats - 1}`, () => {
      expect(
        getLinkPriority({
          description: 'Data in CSV format',
          name: 'abc.csv',
          url: new URL('https://my.server/files/abc.csv'),
          type: 'download',
        })
      ).toEqual(nFormats - 1)
    })
    it(`returns ${nFormats - 6}`, () => {
      expect(
        getLinkPriority({
          description: 'Data in KML format',
          name: 'abc.kml',
          url: new URL('https://my.server/files/abc.kml'),
          type: 'download',
        })
      ).toEqual(nFormats - 6)
    })
  })
  describe('#checkFileFormat', () => {
    describe('in link name and url', () => {
      it('returns true for file format', () => {
        expect(
          checkFileFormat(
            {
              description: 'Test file',
              name: 'file.geojson',
              url: new URL('http://example.com'),
              type: 'download',
            },
            'geojson'
          )
        ).toEqual(true)
      })
    })
    describe('in link name and url', () => {
      it('returns false for file format', () => {
        expect(
          checkFileFormat(
            {
              description: 'Test file',
              name: 'file.geojson',
              url: new URL('http://example.com'),
              type: 'download',
            },
            'csv'
          )
        ).toEqual(false)
      })
    })
  })
  describe('#mimeTypeToFormat', () => {
    it('returns json for mimetype', () => {
      expect(mimeTypeToFormat('application/json')).toEqual('json')
    })
    it('returns geojson for mimetype', () => {
      const geojson1 = mimeTypeToFormat('application/geo+json')
      const geojson2 = mimeTypeToFormat('application/vnd.geo+json')
      expect([geojson1, geojson2]).toEqual(['geojson', 'geojson'])
    })
    it('returns csv for mimetype', () => {
      const csv1 = mimeTypeToFormat('text/csv')
      const csv2 = mimeTypeToFormat('application/csv')
      expect([csv1, csv2]).toEqual(['csv', 'csv'])
    })
    it('returns shp for mimetype', () => {
      expect(mimeTypeToFormat('x-gis/x-shapefile')).toEqual('shp')
    })
    it('returns excel for mimetype', () => {
      const excel1 = mimeTypeToFormat('application/vnd.ms-excel')
      const excel2 = mimeTypeToFormat(
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      )
      expect([excel1, excel2]).toEqual(['excel', 'excel'])
    })
  })

  describe('#getLinkLabel', () => {
    it('returns label for WMS link', () => {
      expect(
        getLinkLabel({
          description: 'A mapping service',
          name: 'some_layer',
          url: new URL('http://example.com/service'),
          type: 'service',
          accessServiceProtocol: 'wms',
        })
      ).toEqual('A mapping service (WMS)')
    })
    it('returns label for WFS link', () => {
      expect(
        getLinkLabel({
          description: 'A feature service',
          name: 'some_layer',
          url: new URL('http://example.com/service'),
          type: 'service',
          accessServiceProtocol: 'wfs',
        })
      ).toEqual('A feature service (WFS)')
    })
    it('returns label for REST link', () => {
      expect(
        getLinkLabel({
          description: 'An esri feature service',
          name: 'some_layer',
          url: new URL('http://example.com/FeatureServer'),
          type: 'service',
          accessServiceProtocol: 'esriRest',
        })
      ).toEqual('An esri feature service (REST)')
    })
    it('returns label for a file link from mime type', () => {
      expect(
        getLinkLabel({
          name: 'Cities',
          url: new URL('http://example.com/data'),
          mimeType: 'application/geo+json',
          type: 'download',
        })
      ).toEqual('Cities (geojson)')
    })
  })

  describe('#getLayers', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should return OGC Features layers', async () => {
      const layers = await getLayers('https://example.com', 'ogcFeatures')
      expect(layers).toEqual([
        {
          name: 'ogc-collection-1',
          title: 'Ogc Collection 1',
        },
        {
          name: 'ogc-collection-2',
          title: 'Ogc Collection 2',
        },
      ])
    })

    it('should return WFS feature types', async () => {
      const layers = await getLayers('https://example.com', 'wfs')
      expect(layers).toEqual([
        {
          name: 'ft1',
          title: 'Feature Type 1',
          abstract: 'Feature Type 1',
        },
        {
          name: 'ft2',
          title: 'Feature Type 2',
          abstract: 'Feature Type 2',
        },
        {
          name: 'ft3',
          title: 'Feature Type 3',
          abstract: 'Feature Type 3',
        },
      ])
    })

    it('should return flattened WMS layers (filtered)', async () => {
      const layers = await getLayers('https://example.com', 'wms')
      expect(layers).toEqual([
        {
          name: 'wms-layer-1',
          title: 'WMS layer 1',
          abstract: 'WMS layer 1',
        },
        {
          name: 'wms-layer-1-1',
          title: 'WMS layer 1 - 1',
          abstract: 'WMS layer 1 - 1',
        },
        {
          name: 'wms-layer-2',
          title: 'WMS layer 2',
          abstract: 'WMS layer 2',
        },
      ])
    })

    it('should return WMTS layers', async () => {
      const layers = await getLayers('https://example.com', 'wmts')
      expect(layers).toEqual([
        {
          name: 'wmts-layer-1',
          title: 'WMTS layer 1',
        },
        {
          name: 'wmts-layer-2',
          title: 'WMTS layer 2',
        },
        {
          name: 'wmts-layer-3',
          title: 'WMTS layer 3',
        },
      ])
    })

    it('should return undefined for an unknown serviceProtocol', async () => {
      const layers = await getLayers('https://example.com', 'unknown' as any)
      expect(layers).toBeUndefined()
    })
  })
})
