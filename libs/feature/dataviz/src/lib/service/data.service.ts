import { Injectable } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import {
  OgcApiCollectionInfo,
  OgcApiEndpoint,
  OgcApiRecord,
  WfsEndpoint,
  WfsVersion,
  TmsEndpoint,
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
import { DatavizConfigModel } from '@geonetwork-ui/common/domain/model/dataviz/dataviz-configuration.model'

marker('wfs.unreachable.cors')
marker('wfs.unreachable.http')
marker('dataset.error.forbidden')
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
      map((urls) => {
        if (urls.geojson) {
          urls.all['application/json'] = urls.geojson
        }
        return urls
      }),
      map((urls) => {
        const resources: DatasetOnlineResource[] = Object.keys(urls.all).map(
          (format) => ({
            ...wfsLink,
            name: wfsLink.name,
            type: 'download' as const,
            url: new URL(urls.all[format]),
            mimeType: getMimeTypeForFormat(
              getFileFormatFromServiceOutput(format)
            ),
          })
        )
        return resources
      })
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
        name: collectionInfo.id,
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
      .catch(() => {
        throw new Error(`ogc.unreachable.unknown`)
      })
  }

  async getGeodataLinksFromTms(
    tmsLink: DatasetServiceDistribution,
    keepOriginalLink = false
  ): Promise<DatasetServiceDistribution[]> {
    const endpoint = new TmsEndpoint(tmsLink.url.toString())
    const tileMaps = await endpoint.allTileMaps.catch(() => {
      throw new Error(`ogc.unreachable.unknown`)
    })
    if (!tileMaps?.length) return null

    // TODO: at some point use the identifierInService field if more that one layers in the TMS service
    const tileMapInfo = await endpoint.getTileMapInfo(tileMaps[0].href)

    // case 1: no styles; return a plain TMS link
    if (!tileMapInfo?.metadata?.length) return [tmsLink]

    // case 2: styles present; return each as a separate link
    const styleLinks = tileMapInfo.metadata
      .filter((meta) => meta.href)
      .map((meta) => {
        const fileName = meta.href.split('/').pop() || ''
        const linkName =
          tmsLink.description || ('name' in tmsLink ? tmsLink.name : '')
        const styleName = fileName.split('.')[0]
        const name = `${linkName} - ${styleName}`
        return {
          type: 'service',
          url: new URL(meta.href),
          name,
          accessServiceProtocol: 'maplibre-style',
        } as DatasetServiceDistribution
      })
    if (keepOriginalLink) {
      styleLinks.unshift(tmsLink)
    }
    return styleLinks
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

  readAsGeoJson(
    link: DatasetOnlineResource,
    cacheActive: boolean
  ): Observable<FeatureCollection> {
    return this.getDataset(link, cacheActive).pipe(
      switchMap((dataset) => dataset.selectAll().read()),
      map((features) => ({
        type: 'FeatureCollection',
        features,
      }))
    )
  }

  writeConfigAsJSON(config: DatavizConfigModel): File {
    const jsonContent = JSON.stringify(config, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    return new File([blob], 'datavizConfig.json', {
      type: 'application/json',
    })
  }

  getDataset(
    link: DatasetOnlineResource,
    cacheActive: boolean
  ): Observable<BaseReader> {
    if (link.type === 'service' && link.accessServiceProtocol === 'wfs') {
      const wfsUrlEndpoint = this.proxy.getProxiedUrl(link.url.toString())
      return from(
        openDataset(
          wfsUrlEndpoint,
          'wfs',
          {
            wfsFeatureType: link.name,
          },
          cacheActive
        )
      )
    } else if (link.type === 'download') {
      const linkProxifiedUrl = this.proxy.getProxiedUrl(link.url.toString())
      const format = getFileFormat(link)
      const supportedType =
        SupportedTypes.indexOf(format as any) > -1
          ? (format as SupportedType)
          : undefined
      return from(
        openDataset(linkProxifiedUrl, supportedType, undefined, cacheActive)
      ).pipe()
    } else if (
      link.type === 'service' &&
      link.accessServiceProtocol === 'esriRest'
    ) {
      const url = this.getDownloadUrlFromEsriRest(
        link.url.toString(),
        'geojson'
      )
      return from(openDataset(url, 'geojson', undefined, cacheActive)).pipe()
    } else if (
      link.type === 'service' &&
      link.accessServiceProtocol === 'ogcFeatures'
    ) {
      return from(this.getDownloadUrlsFromOgcApi(link.url.href)).pipe(
        switchMap((collectionInfo) => {
          const geojsonUrl = collectionInfo.jsonDownloadLink
          return openDataset(geojsonUrl, 'geojson', undefined, cacheActive)
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
