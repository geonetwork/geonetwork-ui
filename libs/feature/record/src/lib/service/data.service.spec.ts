import { TestBed } from '@angular/core/testing'
import { DataService } from './data.service'
import { readFirst } from '@nrwl/angular/testing'
import { readDataset } from '@geonetwork-ui/data-fetcher'
import { PROXY_PATH } from '@geonetwork-ui/util/shared'
import { getLinksWithEsriRestFormats } from '@geonetwork-ui/feature/search'

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
            outputFormats:
              name.indexOf('nojson') > -1
                ? ['csv', 'xls']
                : ['csv', 'xls', 'json'],
          }
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
  readDataset: jest.fn(
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
        resolve(SAMPLE_GEOJSON.features)
      })
  ),
  SupportedTypes: ['csv', 'geojson', 'json', 'excel'],
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
      }
      describe('WFS unreachable (CORS)', () => {
        it('throws a relevant error', async () => {
          try {
            await readFirst(
              service.getDownloadLinksFromWfs({
                ...link,
                url: 'http://error.cors/wfs',
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
            await readFirst(
              service.getDownloadLinksFromWfs({
                ...link,
                url: 'http://error.http/wfs',
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
            await readFirst(
              service.getDownloadLinksFromWfs({
                ...link,
                url: 'http://error/wfs',
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
            await readFirst(
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
          const urls = await readFirst(
            service.getDownloadLinksFromWfs({
              ...link,
              url: 'http://local/wfs',
            })
          )
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              format: 'csv',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=csv',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              format: 'xls',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=xls',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              format: 'json',
              name: 'surval_parametre_ligne',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=json',
            },
          ])
        })
      })
      describe('WFS without GeoJSON support', () => {
        it('returns a list of links (without geojson)', async () => {
          const urls = await readFirst(
            service.getDownloadLinksFromWfs({
              ...link,
              url: 'http://local/wfs',
              name: 'nojson_type',
            })
          )
          expect(urls).toEqual([
            {
              description: 'Lieu de surveillance (ligne)',
              format: 'csv',
              name: 'nojson_type',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=nojson_type&format=csv',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              format: 'xls',
              name: 'nojson_type',
              protocol: 'OGC:WFS',
              url: 'http://local/wfs?GetFeature&FeatureType=nojson_type&format=xls',
            },
          ])
        })
      })
    })

    describe('#getGeoJsonDownloadUrlFromWfs', () => {
      describe('WFS with GeoJSON support', () => {
        it('returns an url', async () => {
          const url = await readFirst(
            service.getGeoJsonDownloadUrlFromWfs('http://local/wfs', 'abcd')
          )
          expect(url).toEqual(
            'http://local/wfs?GetFeature&FeatureType=abcd&format=geojson'
          )
        })
      })
      describe('WFS without GeoJSON support', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await readFirst(
              service.getGeoJsonDownloadUrlFromWfs(
                'http://local/wfs',
                'nojsontype'
              )
            )
          } catch (e) {
            expect(e.message).toBe('wfs.geojson.notsupported')
          }
        })
      })
    })
    describe('#getGeoJsonDownloadUrlFromEsriRest', () => {
      it('builds the url using API url', () => {
        expect(
          service.getGeoJsonDownloadUrlFromEsriRest('http://esri.rest/local/')
        ).toBe('http://esri.rest/local//query?f=geojson&where=1=1&outFields=*')
      })
    })

    describe('#getDownloadLinksFromEsriRest', () => {
      it('returns links with formats for link', () => {
        expect(
          service.getDownloadLinksFromEsriRest({
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

    describe('#readDataset', () => {
      describe('parse failure', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await readFirst(
              service.readDataset('http://error.parse/geojson', 'geojson')
            )
          } catch (e) {
            expect(e.message).toBe('dataset.error.parse')
          }
        })
      })
      describe('CORS or network error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await readFirst(
              service.readDataset('http://error.network/xls', 'excel')
            )
          } catch (e) {
            expect(e.message).toBe('dataset.error.network')
          }
        })
      })
      describe('HTTP error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await readFirst(service.readDataset('http://error.http/csv', 'csv'))
          } catch (e) {
            expect(e.message).toBe('dataset.error.http')
          }
        })
      })
      describe('unknown error', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await readFirst(service.readDataset('http://error/xls', 'excel'))
          } catch (e) {
            expect(e.message).toBe('dataset.error.unknown')
          }
        })
      })
      describe('valid file', () => {
        it('calls DataFetcher.readDataset', () => {
          service.readDataset('http://sample/geojson', 'csv')
          expect(readDataset).toHaveBeenCalledWith(
            'http://sample/geojson',
            'csv'
          )
        })
        it('returns an observable that emits the feature collection', async () => {
          const result = await readFirst(
            service.readDataset('http://sample/csv', 'csv')
          )
          expect(result).toEqual(SAMPLE_GEOJSON)
        })
      })
    })

    describe('#readGeoJsonDataset', () => {
      describe('valid file', () => {
        it('returns an observable that emits the feature collection', async () => {
          const result = await readFirst(
            service.readGeoJsonDataset('http://sample/geojson')
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
        service.getGeoJsonDownloadUrlFromWfs('http://local/wfs', 'abcd')
        expect(newEndpointCall).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Flocal%2Fwfs'
        )
      })
      it('returns a proxied url', async () => {
        const url = await readFirst(
          service.getGeoJsonDownloadUrlFromWfs('http://local/wfs', 'abcd')
        )
        expect(url).toEqual(
          'http://proxy.local/?url=http%3A%2F%2Flocal%2Fwfs?GetFeature&FeatureType=abcd&format=geojson'
        )
      })
    })

    describe('#getGeoJsonDownloadUrlFromEsriRest', () => {
      it('builds a proxied url', () => {
        expect(
          service.getGeoJsonDownloadUrlFromEsriRest('http://esri.rest/local/')
        ).toBe(
          'http://proxy.local/?url=http%3A%2F%2Fesri.rest%2Flocal%2F%2Fquery%3Ff%3Dgeojson%26where%3D1%3D1%26outFields%3D*'
        )
      })
    })

    describe('#readGeoJsonDataset', () => {
      it('calls DataFetcher.readDataset with a proxied url', () => {
        service.readDataset('http://sample/geojson', 'csv')
        expect(readDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv'
        )
      })
      it('does not apply the proxy twice', () => {
        service.readDataset(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv'
        )
        expect(readDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv'
        )
      })
    })
  })
})
