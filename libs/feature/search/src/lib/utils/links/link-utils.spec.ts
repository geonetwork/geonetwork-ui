import {
  getFileFormat,
  getWfsFormat,
  checkFileFormat,
  mimeTypeToFormat,
} from './link-utils'
import { LINK_FIXTURES } from './link.fixtures'

jest.mock('@camptocamp/ogc-client', () => ({
  WfsEndpoint: class {
    constructor(private url) {}
    isReady() {
      return Promise.resolve({
        getFeatureUrl: () => this.url + '?GetFeature',
        getFeatureTypeSummary: (name) => {
          return name !== 'NOT_A_LAYER_NAME'
            ? {
                name,
                outputFormats: ['geojson', 'csv'],
              }
            : null
        },
      })
    }
  },
}))

describe('link utils', () => {
  describe('#getFileFormat', () => {
    describe('for a csv FILE link', () => {
      it('returns csv format', () => {
        expect(getFileFormat(LINK_FIXTURES.dataCsv)).toEqual('csv')
      })
    })
    describe('for a geojson FILE link', () => {
      it('returns geojson format', () => {
        expect(getFileFormat(LINK_FIXTURES.geodataJson)).toEqual('geojson')
      })
    })
    describe('for a geojson FILE link with mime type in protocol', () => {
      it('returns geojson format', () => {
        expect(getFileFormat(LINK_FIXTURES.geodataJsonWithMimeType)).toEqual(
          'geojson'
        )
      })
    })
    describe('for a json FILE link', () => {
      it('returns json format', () => {
        expect(getFileFormat(LINK_FIXTURES.dataJson)).toEqual('json')
      })
    })
    describe('for a shapefile link', () => {
      it('returns shp format', () => {
        expect(getFileFormat(LINK_FIXTURES.geodataShp)).toEqual('shp')
      })
    })
    describe('for a shapefile link withe MimeType', () => {
      it('returns shp format', () => {
        expect(getFileFormat(LINK_FIXTURES.geodataShpWithMimeType)).toEqual(
          'shp'
        )
      })
    })
    describe('for a kml FILE link', () => {
      it('returns kml format', () => {
        expect(getFileFormat(LINK_FIXTURES.geodataKml)).toEqual('kml')
      })
    })
    describe('for a geopackage FILE link', () => {
      it('returns gpkg format', () => {
        expect(getFileFormat(LINK_FIXTURES.geodataGpkg)).toEqual('gpkg')
      })
    })
    describe('for an excel FILE link', () => {
      it('returns excel format', () => {
        expect(getFileFormat(LINK_FIXTURES.dataXlsx)).toEqual('excel')
      })
    })
    describe('for a pdf FILE link', () => {
      it('returns pdf format', () => {
        expect(getFileFormat(LINK_FIXTURES.dataPdf)).toEqual('pdf')
      })
    })
    describe('for a jpg FILE link', () => {
      it('returns jpg format', () => {
        expect(getFileFormat(LINK_FIXTURES.dataJpg)).toEqual('jpg')
      })
    })
    describe('for a zip FILE link', () => {
      it('returns zip format', () => {
        expect(getFileFormat(LINK_FIXTURES.dataZip)).toEqual('zip')
      })
    })
  })
  describe('#getFileFormat', () => {
    it('from link format', () => {
      expect(
        getFileFormat({
          name: 'Cities',
          label: 'Cities',
          format: 'geojson',
          protocol: 'WWW:DOWNLOAD',
          url: 'http://example.com/data',
        })
      ).toEqual('geojson')
    })
    it('from link url', () => {
      expect(
        getFileFormat({
          name: 'Cities',
          label: 'Cities',
          protocol: 'WWW:DOWNLOAD',
          url: 'http://example.com/data.geojson',
        })
      ).toEqual('geojson')
    })
    it('from link protocol', () => {
      expect(
        getFileFormat({
          name: 'Cities',
          label: 'Cities',
          protocol: 'WWW:DOWNLOAD:application/vnd.geo+json',
          url: 'http://example.com/data',
        })
      ).toEqual('geojson')
    })
  })
  describe('#getWfsFormat for a WFS link with geojson format', () => {
    it('returns WFS:geojson format', () => {
      expect(
        getWfsFormat({
          description: 'Test service',
          name: 'some_layer',
          format: 'geojson',
          protocol: 'OGC:WFS',
          url: 'http://example.com/service',
        })
      ).toEqual('WFS:geojson')
    })
  })
  describe('#checkFileFormat', () => {
    describe('in link name and url', () => {
      it('returns true for file format', () => {
        expect(
          checkFileFormat(
            {
              description: 'Test file',
              label: 'Test file',
              name: 'file.geojson',
              protocol: 'WWW:DOWNLOAD',
              url: 'http://example.com',
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
              label: 'Test file',
              name: 'file.geojson',
              protocol: 'WWW:DOWNLOAD',
              url: 'http://example.com',
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
})
