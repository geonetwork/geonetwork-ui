import {
  getDownloadFormat,
  DownloadFormatType,
  checkFileFormat,
  getLinksWithEsriRestFormats,
  getLinksWithWfsFormats,
  getEsriRestDataUrl,
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
  describe('#getDownloadFormat', () => {
    describe('for a csv FILE link', () => {
      it('returns csv format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.dataCsv, DownloadFormatType.FILE)
        ).toEqual('csv')
      })
    })
    describe('for a geojson FILE link', () => {
      it('returns geojson format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.geodataJson, DownloadFormatType.FILE)
        ).toEqual('geojson')
      })
    })
    describe('for a geojson FILE link with mime type in protocol', () => {
      it('returns geojson format', () => {
        expect(
          getDownloadFormat(
            LINK_FIXTURES.geodataJsonWithMimeType,
            DownloadFormatType.FILE
          )
        ).toEqual('geojson')
      })
    })
    describe('for a json FILE link', () => {
      it('returns json format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.dataJson, DownloadFormatType.FILE)
        ).toEqual('json')
      })
    })
    describe('for a shapefile link', () => {
      it('returns shp format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.geodataShp, DownloadFormatType.FILE)
        ).toEqual('shp')
      })
    })
    describe('for a shapefile link withe MimeType', () => {
      it('returns shp format', () => {
        expect(
          getDownloadFormat(
            LINK_FIXTURES.geodataShpWithMimeType,
            DownloadFormatType.FILE
          )
        ).toEqual('shp')
      })
    })
    describe('for a kml FILE link', () => {
      it('returns kml format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.geodataKml, DownloadFormatType.FILE)
        ).toEqual('kml')
      })
    })
    describe('for a geopackage FILE link', () => {
      it('returns gpkg format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.geodataGpkg, DownloadFormatType.FILE)
        ).toEqual('gpkg')
      })
    })
    describe('for an excel FILE link', () => {
      it('returns excel format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.dataXlsx, DownloadFormatType.FILE)
        ).toEqual('excel')
      })
    })
    describe('for a pdf FILE link', () => {
      it('returns pdf format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.dataPdf, DownloadFormatType.FILE)
        ).toEqual('pdf')
      })
    })
    describe('for a jpg FILE link', () => {
      it('returns jpg format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.dataJpg, DownloadFormatType.FILE)
        ).toEqual('jpg')
      })
    })
    describe('for a zip FILE link', () => {
      it('returns zip format', () => {
        expect(
          getDownloadFormat(LINK_FIXTURES.dataZip, DownloadFormatType.FILE)
        ).toEqual('zip')
      })
    })
    describe('for a WFS link with geojson format', () => {
      it('returns WFS:geojson format', () => {
        expect(
          getDownloadFormat(
            {
              description: 'Test service',
              name: 'some_layer',
              format: 'geojson',
              protocol: 'OGC:WFS',
              url: 'http://example.com/service',
            },
            DownloadFormatType.WFS
          )
        ).toEqual('WFS:geojson')
      })
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
  describe('#getLinksWithEsriRestFormats', () => {
    it('returns links with formats for link', () => {
      expect(
        getLinksWithEsriRestFormats({
          protocol: 'ESRI:REST',
          name: 'myrestlayer',
          format: 'arcgis geoservices rest api',
          url: 'https://my.esri.server/FeatureServer',
        })
      ).toEqual([
        {
          protocol: 'ESRI:REST',
          name: 'myrestlayer',
          format: 'REST:json',
          url: 'https://my.esri.server/FeatureServer/query?f=json&where=1=1&outFields=*',
        },
        {
          protocol: 'ESRI:REST',
          name: 'myrestlayer',
          format: 'REST:geojson',
          url: 'https://my.esri.server/FeatureServer/query?f=geojson&where=1=1&outFields=*',
        },
      ])
    })
  })
  describe('#getEsriRestDataUrl', () => {
    it('returns data url for ESRI:REST FeatureServer in requested format', () => {
      expect(
        getEsriRestDataUrl(
          {
            protocol: 'ESRI:REST',
            name: 'myrestlayer',
            format: 'arcgis geoservices rest api',
            url: 'https://my.esri.server/FeatureServer',
          },
          'geojson'
        )
      ).toEqual(
        'https://my.esri.server/FeatureServer/query?f=geojson&where=1=1&outFields=*'
      )
    })
  })
  describe('#getLinksWithWfsFormats', () => {
    it('returns links with formats for WFS links with protocol OGC:WFS', async () => {
      await expect(
        getLinksWithWfsFormats({
          description: 'Lieu de surveillance (ligne)',
          name: 'surval_parametre_ligne',
          protocol: 'OGC:WFS',
          url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
        })
      ).resolves.toEqual([
        {
          description: 'Lieu de surveillance (ligne)',
          format: 'geojson',
          name: 'surval_parametre_ligne',
          protocol: 'OGC:WFS',
          url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale?GetFeature',
        },
        {
          description: 'Lieu de surveillance (ligne)',
          format: 'csv',
          name: 'surval_parametre_ligne',
          protocol: 'OGC:WFS',
          url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale?GetFeature',
        },
      ])
    })
    it('returns links with formats for WFS links with protocol ESRI:REST', async () => {
      await expect(
        getLinksWithWfsFormats({
          protocol: 'ESRI:REST',
          name: 'myrestlayer',
          format: 'arcgis geoservices rest api',
          url: 'https://my.esri.server/WFSServer',
        })
      ).resolves.toEqual([
        {
          protocol: 'ESRI:REST',
          name: 'myrestlayer',
          format: 'geojson',
          url: 'https://my.esri.server/WFSServer?GetFeature',
        },
        {
          protocol: 'ESRI:REST',
          name: 'myrestlayer',
          format: 'csv',
          url: 'https://my.esri.server/WFSServer?GetFeature',
        },
      ])
    })
    it('returns null for WFS links where name does not match layer name', async () => {
      await expect(
        getLinksWithWfsFormats({
          protocol: 'ESRI:REST',
          name: 'NOT_A_LAYER_NAME',
          format: 'arcgis geoservices rest api',
          url: 'https://my.other.esri.server/WFSServer',
        })
      ).rejects.toEqual(new Error('downloads.wfs.featuretype.not.found'))
    })
  })
})
