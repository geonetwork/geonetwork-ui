import { TestBed } from '@angular/core/testing'
import { DataService } from './data.service'
import { openDataset } from '@geonetwork-ui/data-fetcher'
import { PROXY_PATH } from '@geonetwork-ui/util/shared'
import { lastValueFrom } from 'rxjs'
import { MockProvider } from 'ng-mocks'
import { Location } from '@angular/common'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'

const newEndpointCall = jest.fn()

jest.mock('@camptocamp/ogc-client', () => ({
  _newEndpointCall: jest.fn(),
  TmsEndpoint: class {
    constructor(private url) {
      newEndpointCall(url)
    }
    allTileMaps =
      this.url.indexOf('error.http') > -1
        ? Promise.reject(new Error())
        : Promise.resolve([{ href: 'tilemap1' }])

    async getTileMapInfo(_href: string) {
      if (this.url.indexOf('no-styles') > -1) {
        return {
          metadata: [],
        }
      }
      return {
        metadata: [
          { href: 'https://my.tms.server/styles/style1.json', name: 'Style 1' },
          { href: 'https://my.tms.server/styles/style2.json', name: 'Style 2' },
        ],
      }
    }
  },
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
    getFeatureTypeFull(name) {
      return name.indexOf('missing') > -1
        ? Promise.resolve(null)
        : Promise.resolve({
            objectCount: 100,
          })
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
  OgcApiEndpoint: class {
    constructor(private url) {
      newEndpointCall(url)
    }
    getCollectionInfo(collectionName) {
      if (this.url.indexOf('error.http') > -1) {
        return Promise.reject({
          type: 'http',
          info: 'Something went wrong',
          httpStatus: 403,
        })
      }
      if (this.url === 'https://my.ogc.api/features') {
        return Promise.resolve({
          name: collectionName,
          id: collectionName === 'collection1' ? 'collection1' : 'collection2',
          bulkDownloadLinks: { json: 'http://json', csv: 'http://csv' },
        })
      }
      return Promise.resolve({
        bulkDownloadLinks: { json: 'http://json', csv: 'http://csv' },
      })
    }
    allCollections = Promise.resolve([
      { name: 'collection1' },
      { name: 'collection2' },
    ])
    featureCollections =
      this.url.indexOf('error.http') > -1
        ? Promise.reject(new Error())
        : Promise.resolve(['collection1', 'collection2'])
    getCollectionItem(_collection: string, _id: string) {
      return Promise.resolve('item1')
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
  const cacheActive = true

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
      } as const
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
            expect((e as Error).message).toBe('wfs.unreachable.cors')
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
            expect((e as Error).message).toBe('wfs.unreachable.http')
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
            expect((e as Error).message).toBe('wfs.unreachable.unknown')
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
            expect((e as Error).message).toBe('wfs.featuretype.notfound')
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
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: 'surval_parametre_ligne',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=xls'
              ),
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: 'surval_parametre_ligne',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=json'
              ),
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/gml+xml',
              name: 'surval_parametre_ligne',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=gml'
              ),
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              accessServiceProtocol: 'wfs',
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: 'surval_parametre_ligne',
              type: 'download',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=json'
              ),
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
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: 'nojson_type',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=nojson_type&format=xls'
              ),
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/gml+xml',
              name: 'nojson_type',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=nojson_type&format=gml'
              ),
              type: 'download',
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
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/vnd.ms-excel',
              name: '',
              url: new URL(
                'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=xls'
              ),
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: '',
              url: new URL(
                'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=json'
              ),

              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/gml+xml',
              name: '',
              url: new URL(
                'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=gml'
              ),
              type: 'download',
              accessServiceProtocol: 'wfs',
            },
            {
              accessServiceProtocol: 'wfs',
              description: 'Lieu de surveillance (ligne)',
              mimeType: 'application/json',
              name: '',
              type: 'download',
              url: new URL(
                'http://local/wfs?GetFeature&FeatureType=surval_parametre_ligne&format=json'
              ),
            },
          ])
        })
      })
      describe('WFS with forced collection name', () => {
        it('should override the name with the provided collection name', async () => {
          const link = {
            description: 'Lieu de surveillance (ligne)',
            name: 'collection_name_forced',
            url: new URL('http://local/wfs'),
            type: 'service',
            accessServiceProtocol: 'wfs',
          } as const

          const urls = await lastValueFrom(
            service.getDownloadLinksFromWfs(link)
          )
          urls.forEach((url) => {
            expect(url.name).toBe('collection_name_forced')
          })
        })
      })
    })

    describe('#getWfsFeatureCount', () => {
      it('should return the feature count when feature type is found', async () => {
        const wfsUrl = 'http://local/wfs'
        const featureTypeName = 'validFeatureType'
        const count = await lastValueFrom(
          service.getWfsFeatureCount(wfsUrl, featureTypeName)
        )
        expect(count).toBe(100)
      })

      it('should throw an error when feature type is not found', async () => {
        const wfsUrl = 'http://local/wfs'
        const featureTypeName = 'missingFeatureType'
        try {
          await lastValueFrom(
            service.getWfsFeatureCount(wfsUrl, featureTypeName)
          )
        } catch (e) {
          expect((e as Error).message).toBe('wfs.featuretype.notfound')
        }
      })

      it('should throw a relevant error when WFS is unreachable (CORS)', async () => {
        const wfsUrl = 'http://error.cors/wfs'
        const featureTypeName = 'validFeatureType'
        try {
          await lastValueFrom(
            service.getWfsFeatureCount(wfsUrl, featureTypeName)
          )
        } catch (e) {
          expect(e.message).toBe('wfs.unreachable.cors')
        }
      })

      it('should throw a relevant error when WFS is unreachable (HTTP error)', async () => {
        const wfsUrl = 'http://error.http/wfs'
        const featureTypeName = 'validFeatureType'
        try {
          await lastValueFrom(
            service.getWfsFeatureCount(wfsUrl, featureTypeName)
          )
        } catch (e) {
          expect(e.message).toBe('wfs.unreachable.http')
        }
      })

      it('should throw a relevant error when WFS is unreachable (unknown)', async () => {
        const wfsUrl = 'http://error/wfs'
        const featureTypeName = 'validFeatureType'
        try {
          await lastValueFrom(
            service.getWfsFeatureCount(wfsUrl, featureTypeName)
          )
        } catch (e) {
          expect(e.message).toBe('wfs.unreachable.unknown')
        }
      })
    })

    describe('#getGeoJsonDownloadUrlFromWfs', () => {
      describe('WFS with GeoJSON support', () => {
        it('returns an url', async () => {
          const url = await lastValueFrom(
            service.getDownloadUrlsFromWfs('http://local/wfs', 'abcd')
          ).then((urls) => urls.geojson)
          expect(url).toEqual(
            'http://local/wfs?GetFeature&FeatureType=abcd&format=geojson'
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
            expect((e as Error).message).toBe('wfs.geojsongml.notsupported')
          }
        })
      })
      describe('WFS with only one feature type, no feature type name specified', () => {
        it('returns one valid link using the only feature type', async () => {
          const url = await lastValueFrom(
            service.getDownloadUrlsFromWfs('http://unique-feature-type/wfs', '')
          ).then((urls) => urls.geojson)
          expect(url).toEqual(
            'http://unique-feature-type/wfs?GetFeature&FeatureType=myOnlyOne&format=geojson'
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

    describe('#getDownloadLinksFromOgcApiFeatures', () => {
      describe('calling getDownloadLinksFromOgcApiFeatures() with a valid URL', () => {
        it('returns links with formats for link', async () => {
          const url = new URL('https://my.ogc.api/features')
          const links = await service.getDownloadLinksFromOgcApiFeatures({
            name: undefined,
            url,
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          })
          expect(links).toEqual([
            {
              name: 'collection1',
              mimeType: 'application/json',
              url: new URL('http://json'),
              type: 'download',
              accessServiceProtocol: 'ogcFeatures',
            },
            {
              name: 'collection1',
              mimeType: 'text/csv',
              url: new URL('http://csv'),
              type: 'download',
              accessServiceProtocol: 'ogcFeatures',
            },
          ])
        })

        it('should OGC override the collection title when it is wrong', async () => {
          const url = new URL('https://my.ogc.api/features')
          const links = await service.getDownloadLinksFromOgcApiFeatures({
            name: 'myFakecollection',
            url,
            type: 'service',
            accessServiceProtocol: 'ogcFeatures',
          })
          expect(links[0].name).toBe('collection1')
          expect(links[1].name).toBe('collection1')
        })
      })

      describe('calling getDownloadLinksFromOgcApiFeatures() with a erroneous URL', () => {
        it('returns an error', async () => {
          try {
            const url = new URL('http://error.http/ogcapi')
            await service.getDownloadLinksFromOgcApiFeatures({
              name: 'mycollection',
              url,
              type: 'service',
              accessServiceProtocol: 'ogcFeatures',
            })
          } catch (e) {
            expect(e.message).toBe('ogc.unreachable.unknown')
          }
        })
      })
    })

    describe('#getDataset', () => {
      describe('parse failure', () => {
        it('returns an observable that errors with a relevant error', async () => {
          try {
            await lastValueFrom(
              service.getDataset(
                {
                  url: new URL('http://error.parse/geojson'),
                  mimeType: 'application/geo+json',
                  type: 'download',
                },
                cacheActive
              )
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
              service.getDataset(
                {
                  url: new URL('http://error.network/xls'),
                  mimeType: 'application/vnd.ms-excel',
                  type: 'download',
                },
                cacheActive
              )
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
              service.getDataset(
                {
                  url: new URL('http://error.http/csv'),
                  mimeType: 'text/csv',
                  type: 'download',
                },
                cacheActive
              )
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
              service.getDataset(
                {
                  url: new URL('http://error/xls'),
                  mimeType: 'application/vnd.ms-excel',
                  type: 'download',
                },
                cacheActive
              )
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
          service.getDataset(
            {
              url: new URL('http://sample/geojson'),
              mimeType: 'text/csv',
              type: 'download',
            },
            cacheActive
          )
          expect(openDataset).toHaveBeenCalledWith(
            'http://sample/geojson',
            'csv',
            undefined,
            true
          )
        })
        it('returns an observable that emits the array of features', async () => {
          const result = await lastValueFrom(
            service.getDataset(
              {
                url: new URL('http://sample/csv'),
                mimeType: 'text/csv',
                type: 'download',
              },
              cacheActive
            )
          )
          await expect(result.read()).resolves.toEqual(SAMPLE_GEOJSON.features)
        })
      })
    })

    describe('#readGeoJsonDataset', () => {
      describe('valid file', () => {
        it('returns an observable that emits the feature collection', async () => {
          const result = await lastValueFrom(
            service.readAsGeoJson(
              {
                url: new URL('http://sample/geojson'),
                mimeType: 'application/geo+json',
                type: 'download',
              },
              cacheActive
            )
          )
          expect(result).toEqual(SAMPLE_GEOJSON)
        })
      })
    })

    describe('#getGeodataLinksFromTms', () => {
      const tmsLink = {
        url: new URL('https://my.tms.server/tms'),
        name: 'LayerName',
        description: 'Layer Description',
        type: 'service',
        accessServiceProtocol: 'tms',
      } as const

      it('returns style links as DatasetServiceDistribution objects', async () => {
        const styles = await service.getGeodataLinksFromTms(tmsLink)
        expect(styles).toEqual([
          {
            type: 'service',
            url: new URL('https://my.tms.server/styles/style1.json'),
            name: 'Layer Description - style1',
            accessServiceProtocol: 'maplibre-style',
          },
          {
            type: 'service',
            url: new URL('https://my.tms.server/styles/style2.json'),
            name: 'Layer Description - style2',
            accessServiceProtocol: 'maplibre-style',
          },
        ])
      })

      it('returns [tmsLink] when there are no styles', async () => {
        const noStyleLink = {
          ...tmsLink,
          url: new URL('https://my.tms.server/no-styles'),
        }
        const styles = await service.getGeodataLinksFromTms(noStyleLink)
        expect(styles).toEqual([noStyleLink])
      })

      it('throws an error', async () => {
        const noStyleLink = {
          ...tmsLink,
          url: new URL('http://error.http/tms'),
        }

        try {
          await service.getGeodataLinksFromTms(noStyleLink)
        } catch (e) {
          expect((e as Error).message).toBe('ogc.unreachable.unknown')
        }
      })
    })
    describe('writeConfigAsJSON', () => {
      it('should return a File object for the config', async () => {
        const config = {
          view: 'map',
          source: {
            url: new URL('http://example.com'),
            type: 'link',
            name: 'test',
          } as DatasetOnlineResource,
          chartConfig: null,
        }
        const file = await service.writeConfigAsJSON(config)

        expect(file).toBeInstanceOf(File)
        expect(file.name).toBe('datavizConfig.json')
        expect(file.type).toBe('application/json')
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
          MockProvider(Location, {
            path: () => '/',
          }),
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
          'http://proxy.local/?url=http%3A%2F%2Flocal%2Fwfs?GetFeature&FeatureType=abcd&format=geojson'
        )
      })
    })

    describe('#getDownloadUrlFromEsriRest', () => {
      it('builds a proxied url', () => {
        expect(
          service.getDownloadUrlFromEsriRest(
            'http://esri.rest/local',
            'geojson'
          )
        ).toBe(
          'http://proxy.local/?url=http%3A%2F%2Fesri.rest%2Flocal%2Fquery%3Ff%3Dgeojson%26where%3D1%3D1%26outFields%3D*'
        )
      })
      it('calls DataFetcher.openDataset with a proxied url', () => {
        service.getDataset(
          {
            url: new URL('http://esri.rest/local'),
            accessServiceProtocol: 'esriRest',
            type: 'service',
          },
          cacheActive
        )
        expect(openDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fesri.rest%2Flocal%2Fquery%3Ff%3Dgeojson%26where%3D1%3D1%26outFields%3D*',
          'geojson',
          undefined,
          true
        )
      })
    })

    describe('#readGeoJsonDataset', () => {
      it('calls DataFetcher.openDataset with a proxied url', () => {
        service.getDataset(
          {
            url: new URL('http://sample/geojson'),
            mimeType: 'text/csv',
            type: 'download',
          },
          cacheActive
        )
        expect(openDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv',
          undefined,
          true
        )
      })
      it('does not apply the proxy twice', () => {
        service.getDataset(
          {
            url: new URL(
              'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson'
            ),
            mimeType: 'text/csv',
            type: 'download',
          },
          cacheActive
        )
        expect(openDataset).toHaveBeenCalledWith(
          'http://proxy.local/?url=http%3A%2F%2Fsample%2Fgeojson',
          'csv',
          undefined,
          true
        )
      })
    })
    describe('#getItemsFromOgcApi', () => {
      describe('calling getItemsFromOgcApi() with a valid URL', () => {
        it('returns the first collection item when collections array is not empty', async () => {
          const item = await service.getItemsFromOgcApi(
            'https://my.ogc.api/features'
          )
          expect(item).toBe('item1')
        })
      })

      describe('calling getItemsFromOgcApi() with an erroneous URL', () => {
        it('throws an error', async () => {
          try {
            await service.getItemsFromOgcApi('http://error.http/ogcapi')
          } catch (e) {
            expect((e as Error).message).toBe('ogc.unreachable.unknown')
          }
        })
      })
    })
  })
})
