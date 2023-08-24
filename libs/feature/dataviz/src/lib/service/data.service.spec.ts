import { TestBed } from '@angular/core/testing'
import { DataService } from './data.service'
import { openDataset } from '@geonetwork-ui/data-fetcher'
import { PROXY_PATH } from '@geonetwork-ui/util/shared'
import { firstValueFrom, lastValueFrom } from 'rxjs'

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
          type: 'http',
          info: 'Something went wrong',
          httpStatus: 403,
        })
      }
      if (this.url.indexOf('error.cors') > -1) {
        return Promise.reject({
          type: 'network',
          info: 'Something went wrong',
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
            type: 'parse',
            info: 'Something went wrong',
          })
          return
        }
        if (url.indexOf('error.http') > -1) {
          reject({
            type: 'http',
            info: 'Something went wrong',
            httpStatus: 404,
          })
          return
        }
        if (url.indexOf('error.network') > -1) {
          reject({
            type: 'network',
            info: 'Something went wrong',
          })
          return
        }
        if (url.indexOf('error') > -1) {
          reject({
            info: 'Something went wrong',
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
        url: new URL(
          'https://www.ifremer.fr/services/wfs/surveillance_littorale'
        ),
        type: 'service',
        accessServiceProtocol: 'wfs',
      }
      describe('WFS unreachable (CORS)', () => {
        it('throws a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDownloadLinksFromWfs({
                ...link,
                url: new URL('http://error.cors/wfs'),
              })
            )
          } catch (e) {
            expect(e.message).toBe('wfs.unreachable.cors')
          }
        })
      })
      describe('WFS unreachable (HTTP error)', () => {
        it('throws a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDownloadLinksFromWfs({
                ...link,
                url: new URL('http://error.http/wfs'),
              })
            )
          } catch (e) {
            expect(e.message).toBe('wfs.unreachable.http')
          }
        })
      })
      describe('WFS unreachable (unknown)', () => {
        it('throws a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDownloadLinksFromWfs({
                ...link,
                url: new URL('http://error/wfs'),
              })
            )
          } catch (e) {
            expect(e.message).toBe('wfs.unreachable.unknown')
          }
        })
      })
      describe('WFS with unknown feature type', () => {
        it('throws a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDownloadLinksFromWfs({
                ...link,
                name: 'featuretype_missing',
              })
            )
          } catch (e) {
            expect(e.message).toBe('wfs.featuretype.notfound')
          }
        })
      })
      describe('WFS with GeoJSON support', () => {
        it('returns a list of links', async () => {
          const urls = await lastValueFrom(
            service.getDownloadLinksFromWfs({
              ...link,
              url: new URL('http://local/wfs'),
            })
          )
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'text/csv',
              name: 'surval_parametre_ligne',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=csv'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: 'surval_parametre_ligne',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=xls'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: 'surval_parametre_ligne',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=json'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'gml',
              name: 'surval_parametre_ligne',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=gml'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
          ])
        })
      })
      describe('WFS without GeoJSON support', () => {
        it('returns a list of links (without geojson)', async () => {
          const urls = await lastValueFrom(
            service.getDownloadLinksFromWfs({
              ...link,
              url: new URL('http://local/wfs'),
              name: 'nojson_type',
            })
          )
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'text/csv',
              name: 'nojson_type',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=nojson_type&format=csv'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: 'nojson_type',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=nojson_type&format=xls'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'gml',
              name: 'nojson_type',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=nojson_type&format=gml'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
          ])
        })
      })
      describe('WFS with only one feature type, no feature type name specified', () => {
        it('returns a list of links using the only feature type', async () => {
          const urls = await lastValueFrom(
            service.getDownloadLinksFromWfs({
              ...link,
              url: new URL('http://unique-feature-type/wfs'),
              name: '',
            })
          )
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'text/csv',
              name: '',
              url: new URL(
                'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=csv'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: '',
              url: new URL(
                'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=xls'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: '',
              url: new URL(
                'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=json'
              ),

              type: 'service',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'gml',
              name: '',
              url: new URL(
                'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=gml'
              ),
              type: 'service',
              accessServiceProtocol: 'wfs',
            },
          ])
        })
      })
    })

    describe('#getGeoJsonDownloadUrlFromWfs', () => {
      describe('WFS with GeoJSON support', () => {
        it('returns an url', async () => {
          const url = await lastValueFrom(
            service.getDownloadUrlsFromWfs('http://local/wfs', 'abcd')
          ).then((urls) => urls.geojson)
          expect(url).toEqual(
            'http://local/wfs?GetFeature&FeatureType=abcd&format=application/json'
          )
        })
      })
      describe('WFS without GeoJSON support', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDownloadUrlsFromWfs('http://local/wfs', 'nojsontype')
            )
          } catch (e) {
            expect(e.message).toBe('wfs.geojsongml.notsupported')
          }
        })
      })
      describe('WFS with only one feature type, no feature type name specified', () => {
        it('returns one valid link using the only feature type', async () => {
          const url = await lastValueFrom(
            service.getDownloadUrlsFromWfs('http://unique-feature-type/wfs', '')
          ).then((urls) => urls.geojson)
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
            name: 'myrestlayer',
            url: new URL('https://my.esri.server/FeatureServer'),
            type: 'service',
            accessServiceProtocol: 'esriRest',
          })
        ).toEqual([
          {
            name: 'myrestlayer',
            mimeType: 'application/json',
            url: new URL(
              'https://my.esri.server/FeatureServer/query?f=json&where=1=1&outFields=*'
            ),
            type: 'service',
            accessServiceProtocol: 'esriRest',
          },
          {
            name: 'myrestlayer',
            mimeType: 'application/geo+json',
            url: new URL(
              'https://my.esri.server/FeatureServer/query?f=geojson&where=1=1&outFields=*'
            ),
            type: 'service',
            accessServiceProtocol: 'esriRest',
          },
        ])
      })
    })

    describe('#getDataset', () => {
      describe('parse failure', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDataset({
                url: new URL('http://error.parse/geojson'),
                mimeType: 'application/geo+json',
                type: 'download',
              })
            )
          } catch (e) {
            expect(e).toStrictEqual({
              info: 'Something went wrong',
              type: 'parse',
            })
          }
        })
      })
      describe('CORS or network error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDataset({
                url: new URL('http://error.network/xls'),
                mimeType: 'application/vnd.ms-excel',
                type: 'download',
              })
            )
          } catch (e) {
            expect(e).toStrictEqual({
              info: 'Something went wrong',
              type: 'network',
            })
          }
        })
      })
      describe('HTTP error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDataset({
                url: new URL('http://error.http/csv'),
                mimeType: 'text/csv',
                type: 'download',
              })
            )
          } catch (e) {
            expect(e).toStrictEqual({
              info: 'Something went wrong',
              type: 'http',
              httpStatus: 404,
            })
          }
        })
      })
      describe('unknown error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDataset({
                url: new URL('http://error/xls'),
                mimeType: 'application/vnd.ms-excel',
                type: 'download',
              })
            )
          } catch (e) {
            expect(e).toStrictEqual({
              info: 'Something went wrong',
            })
          }
        })
      })
      describe('valid file', () => {
        it('calls DataFetcher.openDataset', () => {
          service.getDataset({
            url: new URL('http://sample/geojson'),
            mimeType: 'text/csv',
            type: 'download',
          })
          expect(openDataset).toHaveBeenCalledWith(
            'http://sample/geojson',
            'csv'
          )
        })
        it('returns an observable that emits the array of features', async () => {
          const result = await lastValueFrom(
            service.getDataset({
              url: new URL('http://sample/csv'),
              mimeType: 'text/csv',
              type: 'download',
            })
          )
          await expect(result.read()).resolves.toEqual(SAMPLE_GEOJSON.features)
        })
      })
    })

    describe('#readGeoJsonDataset', () => {
      describe('valid file', () => {
        it('returns an observable that emits the feature collection', async () => {
          const result = await lastValueFrom(
            service.readAsGeoJson({
              url: new URL('http://sample/geojson'),
              mimeType: 'application/geo+json',
              type: 'download',
            })
          )
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
        const url = await lastValueFrom(
          service.getDownloadUrlsFromWfs('http://local/wfs', 'abcd')
        ).then((urls) => urls.geojson)
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
          url: new URL('http://sample/geojson'),
          mimeType: 'text/csv',
          type: 'download',
        })
        expect(openDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv'
        )
      })
      it('does not apply the proxy twice', () => {
        service.getDataset({
          url: new URL('http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson'),
          mimeType: 'text/csv',
          type: 'download',
        })
        expect(openDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv'
        )
      })
    })
  })
})
