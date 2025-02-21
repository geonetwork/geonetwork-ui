import { Injectable } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  OgcApiCollectionInfo,
  OgcApiEndpoint,
  OgcApiRecord,
  WfsEndpoint,
  WfsVersion,
} from '@camptocamp/ogc-client'
import {
  BaseReader,
  FetchError,
  openDataset,
  SupportedType,
  SupportedTypes,
} from '@geonetwork-ui/data-fetcher'
import {
  getFileFormat,
  getFileFormatFromServiceOutput,
  getMimeTypeForFormat,
  ProxyService,
} from '@geonetwork-ui/util/shared'
import type { FeatureCollection } from 'geojson'
import { from, Observable, throwError } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import {
  DatasetOnlineResource,
  DatasetServiceDistribution,
} from '@geonetwork-ui/common/domain/model/record'

marker('wfs.unreachable.cors')
marker('wfs.unreachable.http')
marker('wfs.unreachable.unknown')
marker('wfs.featuretype.notfound')
marker('wfs.geojsongml.notsupported')
marker('ogc.unreachable.unknown')
marker('dataset.error.network')
marker('dataset.error.http')
marker('dataset.error.parse')
marker('dataset.error.unsupportedType')
marker('dataset.error.unknown')

interface WfsDownloadUrls {
  all: { [format: string]: string }
  geojson: string
  gml: { featureUrl: string; namespace: string; wfsVersion: WfsVersion }
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private proxy: ProxyService) {}

  getWfsEndpoint(wfsUrl: string): Observable<WfsEndpoint> {
    return from(
      new WfsEndpoint(this.proxy.getProxiedUrl(wfsUrl)).isReady()
    ).pipe(
      catchError((error: FetchError | Error) => {
        if (error instanceof Error) {
          throw new Error(`wfs.unreachable.unknown`)
        } else {
          if (error.type === 'network') {
            throw new Error(`wfs.unreachable.cors`)
          }
          if (error.type === 'http') {
            throw new Error(`wfs.unreachable.http`)
          }
          if (error.type === 'parse') {
            throw new Error(`wfs.unreachable.parse`)
          }
          if (error.type === 'unsupportedType') {
            throw new Error(`wfs.unreachable.unsupportedType`)
          } else {
            throw new Error(`wfs.unreachable.unknown`)
          }
        }
      })
    )
  }

  getDownloadUrlsFromWfs(
    wfsUrl: string,
    featureTypeName: string
  ): Observable<WfsDownloadUrls> {
    return this.getWfsEndpoint(wfsUrl).pipe(
      map((endpoint) => {
        const featureTypes = endpoint.getFeatureTypes()
        const featureType = endpoint.getFeatureTypeSummary(
          featureTypes.length === 1 && !featureTypeName
            ? featureTypes[0].name
            : featureTypeName
        )
        if (!featureType) {
          throw new Error('wfs.featuretype.notfound')
        }
        return {
          all: featureType.outputFormats.reduce(
            (prev, curr) => ({
              ...prev,
              [curr]: endpoint.getFeatureUrl(featureType.name, {
                outputFormat: curr,
              }),
            }),
            {}
          ),
          geojson: endpoint.supportsJson(featureType.name)
            ? endpoint.getFeatureUrl(featureType.name, {
                asJson: true,
                outputCrs: 'EPSG:4326',
              })
            : null,
          gml:
            featureType.outputFormats.find((f) =>
              f.toLowerCase().includes('gml')
            ) &&
            (featureType.defaultCrs === 'EPSG:4326' ||
              featureType.otherCrs?.includes('EPSG:4326'))
              ? {
                  featureUrl: endpoint.getFeatureUrl(featureType.name, {
                    outputFormat: featureType.outputFormats.find((f) =>
                      f.toLowerCase().includes('gml')
                    ),
                    outputCrs: 'EPSG:4326',
                  }),
                  namespace: featureType.name,
                  wfsVersion: endpoint.getVersion(),
                }
              : null,
        }
      })
    )
  }

  getWfsFeatureCount(
    wfsUrl: string,
    featureTypeName: string
  ): Observable<number> {
    return this.getWfsEndpoint(wfsUrl).pipe(
      switchMap((endpoint) =>
        from(endpoint.getFeatureTypeFull(featureTypeName)).pipe(
          map((featureType) => {
            if (!featureType) {
              throw new Error('wfs.featuretype.notfound')
            }
            return featureType.objectCount
          })
        )
      )
    )
  }

  getDownloadUrlFromEsriRest(apiUrl: string, format: string): string {
    return this.proxy.getProxiedUrl(
      `${apiUrl}/query?f=${format}&where=1=1&outFields=*`
    )
  }

  getDownloadLinksFromWfs(
    wfsLink: DatasetServiceDistribution
  ): Observable<DatasetOnlineResource[]> {
    // Pour DL toutes les données
    return this.getDownloadUrlsFromWfs(
      wfsLink.url.toString(),
      wfsLink.name
    ).pipe(
      map((urls) => urls.all),
      map((urls) =>
        Object.keys(urls).map((format) => ({
          ...wfsLink,
          type: 'download',
          url: new URL(urls[format]),
          mimeType: getMimeTypeForFormat(
            getFileFormatFromServiceOutput(format)
          ),
        }))
      )
    )
  }

  async getDownloadLinksFromOgcApiFeatures(
    ogcApiLink: DatasetServiceDistribution
  ): Promise<DatasetOnlineResource[]> {
    const collectionInfo = await this.getDownloadUrlsFromOgcApi(
      ogcApiLink.url.href
    )
    return Object.keys(collectionInfo.bulkDownloadLinks).map((downloadLink) => {
      return {
        ...ogcApiLink,
        type: 'download',
        url: new URL(collectionInfo.bulkDownloadLinks[downloadLink]),
        mimeType: getMimeTypeForFormat(
          getFileFormatFromServiceOutput(downloadLink)
        ),
      }
    })
  }

  async getDownloadUrlsFromOgcApi(url: string): Promise<OgcApiCollectionInfo> {
    const endpoint = new OgcApiEndpoint(url)
    return await endpoint.allCollections
      .then((collections) => {
        return endpoint.getCollectionInfo(collections[0].name)
      })
      .catch((error) => {
        throw new Error(`ogc.unreachable.unknown`)
      })
  }

  async getItemsFromOgcApi(url: string): Promise<OgcApiRecord> {
    const endpoint = new OgcApiEndpoint(url)
    return await endpoint.featureCollections
      .then((collections) => {
        return collections.length
          ? endpoint.getCollectionItem(collections[0], '1')
          : null
      })
      .catch((error) => {
        throw new Error(`ogc.unreachable.unknown`)
      })
  }

  getDownloadLinksFromEsriRest(
    esriRestLink: DatasetServiceDistribution
  ): DatasetOnlineResource[] {
    return ['json', 'geojson'].map((format) => ({
      ...esriRestLink,
      url: new URL(
        this.getDownloadUrlFromEsriRest(esriRestLink.url.toString(), format)
      ),
      mimeType: getMimeTypeForFormat(getFileFormatFromServiceOutput(format)),
    }))
  }

  readAsGeoJson(link: DatasetOnlineResource): Observable<FeatureCollection> {
    return this.getDataset(link).pipe(
      switchMap((dataset) => dataset.selectAll().read()),
      map((features) => ({
        type: 'FeatureCollection',
        features,
      }))
    )
  }

  getDataset(link: DatasetOnlineResource): Observable<BaseReader> {
    if (link.type === 'service' && link.accessServiceProtocol === 'wfs') {
      const wfsUrlEndpoint = this.proxy.getProxiedUrl(link.url.toString())
      return from(
        openDataset(wfsUrlEndpoint, 'wfs', {
          wfsFeatureType: link.name,
        })
      )
    } else if (link.type === 'download') {
      const linkProxifiedUrl = this.proxy.getProxiedUrl(link.url.toString())
      const format = getFileFormat(link)
      const supportedType =
        SupportedTypes.indexOf(format as any) > -1
          ? (format as SupportedType)
          : undefined
      return from(openDataset(linkProxifiedUrl, supportedType)).pipe()
    } else if (
      link.type === 'service' &&
      link.accessServiceProtocol === 'esriRest'
    ) {
      const url = this.getDownloadUrlFromEsriRest(
        link.url.toString(),
        'geojson'
      )
      return from(openDataset(url, 'geojson')).pipe()
    } else if (
      link.type === 'service' &&
      link.accessServiceProtocol === 'ogcFeatures'
    ) {
      return from(this.getDownloadUrlsFromOgcApi(link.url.href)).pipe(
        switchMap((collectionInfo) => {
          const geojsonUrl = collectionInfo.jsonDownloadLink
          return openDataset(geojsonUrl, 'geojson')
        }),
        tap((url) => {
          if (url === null) {
            throw new Error('wfs.geojsongml.notsupported')
          }
        })
      )
    }
    return throwError(() => 'protocol not supported')
  }
}
