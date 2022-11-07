import { LINK_FIXTURES } from '../fixtures'
import { MetadataLinkType } from '../models'
import {
  checkFileFormat,
  extensionToFormat,
  FORMATS,
  getBadgeColor,
  getFileFormat,
  getLinkLabel,
  mimeTypeToFormat,
  sortPriority,
} from './link-utils'

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
    it('from link url', () => {
      expect(
        getFileFormat({
          name: 'Cities',
          label: 'Cities',
          protocol: 'WWW:DOWNLOAD',
          url: 'http://example.com/data.geojson',
          type: MetadataLinkType.DOWNLOAD,
        })
      ).toEqual('geojson')
    })
    it('from mime type', () => {
      expect(
        getFileFormat({
          name: 'Cities',
          label: 'Cities',
          protocol: 'WWW:DOWNLOAD:application/vnd.geo+json',
          mimeType: 'application/vnd.geo+json',
          url: 'http://example.com/data',
          type: MetadataLinkType.DOWNLOAD,
        })
      ).toEqual('geojson')
    })
  })
  describe('#extensionToFormat for an XLS extension', () => {
    it('returns excel format', () => {
      expect(extensionToFormat('XLS')).toEqual('excel')
    })
  })
  describe('#getBadgeColor for format', () => {
    it('returns #1e5180', () => {
      expect(getBadgeColor('json')).toEqual('#1e5180')
    })
    it('returns #559d7f', () => {
      expect(getBadgeColor('csv')).toEqual('#559d7f')
    })
  })
  describe('#sortPriority from formats object', () => {
    const nFormats = Object.keys(FORMATS).length
    it(`returns ${nFormats - 1}`, () => {
      expect(
        sortPriority({
          protocol: 'WWW:DOWNLOAD',
          description: 'Data in CSV format',
          label: 'Data in CSV format',
          name: 'abc.csv',
          url: 'https://my.server/files/abc.csv',
          type: MetadataLinkType.DOWNLOAD,
        })
      ).toEqual(nFormats - 1)
    })
    it(`returns ${nFormats - 5}`, () => {
      expect(
        sortPriority({
          protocol: 'WWW:DOWNLOAD',
          description: 'Data in KML format',
          label: 'Data in KML format',
          name: 'abc.kml',
          url: 'https://my.server/files/abc.kml',
          type: MetadataLinkType.DOWNLOAD,
        })
      ).toEqual(nFormats - 5)
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
              type: MetadataLinkType.DOWNLOAD,
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
              type: MetadataLinkType.DOWNLOAD,
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
          label: 'A mapping service',
          name: 'some_layer',
          protocol: 'OGC:WMS',
          url: 'http://example.com/service',
          type: MetadataLinkType.WMS,
        })
      ).toEqual('A mapping service (WMS)')
    })
    it('returns label for WFS link', () => {
      expect(
        getLinkLabel({
          description: 'A feature service',
          label: 'A feature service',
          name: 'some_layer',
          protocol: 'OGC:WFS',
          url: 'http://example.com/service',
          type: MetadataLinkType.WFS,
        })
      ).toEqual('A feature service (WFS)')
    })
    it('returns label for REST link', () => {
      expect(
        getLinkLabel({
          description: 'An esri feature service',
          label: 'An esri feature service',
          name: 'some_layer',
          protocol: 'ESRI:REST',
          url: 'http://example.com/FeatureServer',
          type: MetadataLinkType.ESRI_REST,
        })
      ).toEqual('An esri feature service (REST)')
    })
    it('returns label for a file link from mime type', () => {
      expect(
        getLinkLabel({
          name: 'Cities',
          label: 'Cities',
          protocol: 'WWW:DOWNLOAD',
          url: 'http://example.com/data',
          mimeType: 'application/geo+json',
          type: MetadataLinkType.DOWNLOAD,
        })
      ).toEqual('Cities (geojson)')
    })
  })
})
