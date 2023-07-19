import { TestBed } from '@angular/core/testing'
import { DataService } from './data.service'
import { openDataset } from '@geonetwork-ui/data-fetcher'
import { MetadataLinkType, PROXY_PATH } from '@geonetwork-ui/util/shared'

const newEndpointCall = jest.fn()

jest.mock('@camptocamp/ogc-client', () => ({
  _newEndpointCall: jest.fn(),
  WfsEndpoint: class {
    constructor(private url) {
      newEndpointCall(url) // to track endpoint creation
    }
    isReady() {
      if (this.url.indexOf('error.http') > -1) {
        return Promise.reject({
          message: 'Something went wrong',
          httpStatus: 403,
        })
      }
      if (this.url.indexOf('error.cors') > -1) {
        return Promise.reject({
          message: 'Something went wrong',
          isCrossOriginRelated: true,
        })
      }
      if (this.url.indexOf('error') > -1) {
        return Promise.reject(new Error('Something went wrong'))
      }
      return Promise.resolve(this)
    }
    getFeatureUrl(featureType, { outputFormat, asJson }) {
      return `${this.url}?GetFeature&FeatureType=${featureType}&format=${
        asJson ? 'geojson' : outputFormat || 'unspecified'
      }`
    }
    supportsJson(name) {
      return name.indexOf('nojson') === -1
    }
    getFeatureTypeSummary(name) {
      return name.indexOf('missing') > -1
        ? null
        : {
            name,
            otherCrs: ['EPSG:4326'],
            outputFormats:
              name.indexOf('nojson') > -1
                ? ['csv', 'xls', 'gml']
                : ['csv', 'xls', 'json', 'gml'],
          }
    }
    getFeatureTypes() {
      if (this.url.indexOf('unique-feature-type') > -1) {
        return [
          {
            name: 'myOnlyOne',
          },
        ]
      }
      return [
        {
          name: 'ft1',
        },
        {
          name: 'ft2',
        },
        {
          name: 'ft3',
        },
      ]
    }

    getVersion(): '1.0.0' | '1.1.0' | '2.0.0' {
      return '2.0.0'
    }
  },
}))

const SAMPLE_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 123,
      properties: {
        test: 'abcd',
      },
      geometry: {},
    },
  ],
}

jest.mock('@geonetwork-ui/data-fetcher', () => ({
  openDataset: jest.fn(
    (url) =>
      new Promise((resolve, reject) => {
        if (url.indexOf('error.parse') > -1) {
          reject({
            message: 'Something went wrong',
            parsingFailed: true,
          })
          return
        }
        if (url.indexOf('error.http') > -1) {
          reject({
            message: 'Something went wrong',
            httpStatus: 404,
          })
          return
        }
        if (url.indexOf('error.network') > -1) {
          reject({
            message: 'Something went wrong',
            isCrossOriginOrNetworkRelated: true,
          })
          return
        }
        if (url.indexOf('error') > -1) {
          reject({
            message: 'Something went wrong',
          })
          return
        }
        const dataset = {
          selectAll: () => dataset,
          read: () => Promise.resolve(SAMPLE_GEOJSON.features),
        }
        resolve(dataset)
      })
  ),
  SupportedTypes: ['csv', 'geojson', 'json', 'excel', 'gml'],
}))

describe('DataService', () => {
  let service: DataService

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('without proxy', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({})
      service = TestBed.inject(DataService)
    })

    it('should be created', () => {
      expect(service).toBeTruthy()
    })

    describe('#getDownloadLinksFromWfs', () => {
      const link = {
        description: 'Lieu de surveillance (ligne)',
        name: 'surval_parametre_ligne',
        protocol: 'OGC:WFS',
        url: 'https://www.ifremer.fr/services/wfs/surveillance_littorale',
        type: MetadataLinkType.WFS,
      }
      describe('WFS unreachable (CORS)', () => {
        it('throws a relevant error', async () => {
          try {
            await service
              .getDownloadLinksFromWfs({
                ...link,
                url: 'http://error.cors/wfs',
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('wfs.unreachable.cors')
          }
        })
      })
      describe('WFS unreachable (HTTP error)', () => {
        it('throws a relevant error', async () => {
          try {
            await service
              .getDownloadLinksFromWfs({
                ...link,
                url: 'http://error.http/wfs',
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('wfs.unreachable.http')
          }
        })
      })
      describe('WFS unreachable (unknown)', () => {
        it('throws a relevant error', async () => {
          try {
            await service
              .getDownloadLinksFromWfs({
                ...link,
                url: 'http://error/wfs',
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('wfs.unreachable.unknown')
          }
        })
      })
      describe('WFS with unknown feature type', () => {
        it('throws a relevant error', async () => {
          try {
            await service
              .getDownloadLinksFromWfs({
                ...link,
                name: 'featuretype_missing',
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('wfs.featuretype.notfound')
          }
        })
      })
      describe('WFS with GeoJSON support', () => {
        it('returns a list of links', async () => {
          const urls = await service
            .getDownloadLinksFromWfs({
              ...link,
              url: 'http://local/wfs',
            })
            .toPromise()
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'text/csv',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=csv',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=xls',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=json',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'gml',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=gml',
              type: MetadataLinkType.WFS,
            },
          ])
        })
      })
      describe('WFS without GeoJSON support', () => {
        it('returns a list of links (without geojson)', async () => {
          const urls = await service
            .getDownloadLinksFromWfs({
              ...link,
              url: 'http://local/wfs',
              name: 'nojson_type',
            })
            .toPromise()
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'text/csv',
              name: 'nojson_type',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=nojson_type&format=csv',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: 'nojson_type',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=nojson_type&format=xls',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'gml',
              name: 'nojson_type',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=nojson_type&format=gml',
              type: MetadataLinkType.WFS,
            },
          ])
        })
      })
      describe('WFS with only one feature type, no feature type name specified', () => {
        it('returns a list of links using the only feature type', async () => {
          const urls = await service
            .getDownloadLinksFromWfs({
              ...link,
              url: 'http://unique-feature-type/wfs',
              name: '',
            })
            .toPromise()
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'text/csv',
              name: '',
              protocol: 'OGC:WFS',
              url: 'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=csv',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: '',
              protocol: 'OGC:WFS',
              url: 'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=xls',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: '',
              protocol: 'OGC:WFS',
              url: 'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=json',
              type: MetadataLinkType.WFS,
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'gml',
              name: '',
              protocol: 'OGC:WFS',
              url: 'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=gml',
              type: MetadataLinkType.WFS,
            },
          ])
        })
      })
    })

    describe('#getGeoJsonDownloadUrlFromWfs', () => {
      describe('WFS with GeoJSON support', () => {
        it('returns an url', async () => {
          const url = await service
            .getDownloadUrlsFromWfs('http://local/wfs', 'abcd')
            .toPromise()
            .then((urls) => urls.geojson)
          expect(url).toEqual(
            'http://local/wfs?GetFeature&FeatureType=abcd&format=application/json'
          )
        })
      })
      describe('WFS without GeoJSON support', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await service
              .getDownloadUrlsFromWfs('http://local/wfs', 'nojsontype')
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('wfs.geojsongml.notsupported')
          }
        })
      })
      describe('WFS with only one feature type, no feature type name specified', () => {
        it('returns one valid link using the only feature type', async () => {
          const url = await service
            .getDownloadUrlsFromWfs('http://unique-feature-type/wfs', '')
            .toPromise()
            .then((urls) => urls.geojson)
          expect(url).toEqual(
            'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=application/json'
          )
        })
      })
    })

    describe('#getDownloadUrlFromEsriRest', () => {
      it('builds the url using API url', () => {
        expect(
          service.getDownloadUrlFromEsriRest(
            'http://esri.rest/local/',
            'geojson'
          )
        ).toBe('http://esri.rest/local//query?f=geojson&where=1=1&outFields=*')
      })
    })

    describe('#getDownloadLinksFromEsriRest', () => {
      it('returns links with formats for link', () => {
        expect(
          service.getDownloadLinksFromEsriRest({
            protocol: 'ESRI:REST',
            name: 'myrestlayer',
            url: 'https://my.esri.server/FeatureServer',
            type: MetadataLinkType.ESRI_REST,
          })
        ).toEqual([
          {
            protocol: 'ESRI:REST',
            name: 'myrestlayer',
            mimeType: 'application/json',
            url: 'https://my.esri.server/FeatureServer/query?f=json&where=1=1&outFields=*',
            type: MetadataLinkType.ESRI_REST,
          },
          {
            protocol: 'ESRI:REST',
            name: 'myrestlayer',
            mimeType: 'application/geo+json',
            url: 'https://my.esri.server/FeatureServer/query?f=geojson&where=1=1&outFields=*',
            type: MetadataLinkType.ESRI_REST,
          },
        ])
      })
    })

    describe('#getDataset', () => {
      describe('parse failure', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await service
              .getDataset({
                url: 'http://error.parse/geojson',
                mimeType: 'application/geo+json',
                type: MetadataLinkType.DOWNLOAD,
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('dataset.error.parse')
          }
        })
      })
      describe('CORS or network error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await service
              .getDataset({
                url: 'http://error.network/xls',
                mimeType: 'application/vnd.ms-excel',
                type: MetadataLinkType.DOWNLOAD,
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('dataset.error.network')
          }
        })
      })
      describe('HTTP error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await service
              .getDataset({
                url: 'http://error.http/csv',
                mimeType: 'text/csv',
                type: MetadataLinkType.DOWNLOAD,
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('dataset.error.http')
          }
        })
      })
      describe('unknown error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await service
              .getDataset({
                url: 'http://error/xls',
                mimeType: 'application/vnd.ms-excel',
                type: MetadataLinkType.DOWNLOAD,
              })
              .toPromise()
          } catch (e) {
            expect(e.message).toBe('dataset.error.unknown')
          }
        })
      })
      describe('valid file', () => {
        it('calls DataFetcher.openDataset', () => {
          service.getDataset({
            url: 'http://sample/geojson',
            mimeType: 'text/csv',
            type: MetadataLinkType.DOWNLOAD,
          })
          expect(openDataset).toHaveBeenCalledWith(
            'http://sample/geojson',
            'csv'
          )
        })
        it('returns an observable that emits the array of features', async () => {
          const result = await service
            .getDataset({
              url: 'http://sample/csv',
              mimeType: 'text/csv',
              type: MetadataLinkType.DOWNLOAD,
            })
            .toPromise()
          await expect(result.read()).resolves.toEqual(SAMPLE_GEOJSON.features)
        })
      })
    })

    describe('#readGeoJsonDataset', () => {
      describe('valid file', () => {
        it('returns an observable that emits the feature collection', async () => {
          const result = await service
            .readAsGeoJson({
              url: 'http://sample/geojson',
              mimeType: 'application/geo+json',
              type: MetadataLinkType.DOWNLOAD,
            })
            .toPromise()
          expect(result).toEqual(SAMPLE_GEOJSON)
        })
      })
    })
  })

  describe('with a proxy path', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: PROXY_PATH,
            useValue: 'http://proxy.local/?url=',
          },
        ],
      })
      service = TestBed.inject(DataService)
    })

    describe('#getGeoJsonDownloadUrlFromWfs', () => {
      it('creates a WFS endpoint with a proxied url', () => {
        service.getDownloadUrlsFromWfs('http://local/wfs', 'abcd')
        expect(newEndpointCall).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Flocal%2Fwfs'
        )
      })
      it('returns a proxied url', async () => {
        const url = await service
          .getDownloadUrlsFromWfs('http://local/wfs', 'abcd')
          .toPromise()
          .then((urls) => urls.geojson)
        expect(url).toEqual(
          'http://proxy.local/?url=http%3A%2F%2Flocal%2Fwfs?GetFeature&FeatureType=abcd&format=application/json'
        )
      })
    })

    describe('#getDownloadUrlFromEsriRest', () => {
      it('builds a proxied url', () => {
        expect(
          service.getDownloadUrlFromEsriRest(
            'http://esri.rest/local/',
            'geojson'
          )
        ).toBe(
          'http://proxy.local/?url=http%3A%2F%2Fesri.rest%2Flocal%2F%2Fquery%3Ff%3Dgeojson%26where%3D1%3D1%26outFields%3D*'
        )
      })
    })

    describe('#readGeoJsonDataset', () => {
      it('calls DataFetcher.openDataset with a proxied url', () => {
        service.getDataset({
          url: 'http://sample/geojson',
          mimeType: 'text/csv',
          type: MetadataLinkType.DOWNLOAD,
        })
        expect(openDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv'
        )
      })
      it('does not apply the proxy twice', () => {
        service.getDataset({
          url: 'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          mimeType: 'text/csv',
          type: MetadataLinkType.DOWNLOAD,
        })
        expect(openDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv'
        )
      })
    })
  })
})
