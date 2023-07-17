import { Injectable } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import {
  BaseReader,
  FetchError,
  openDataset,
  SupportedType,
  SupportedTypes,
} from '@geonetwork-ui/data-fetcher'
import {
  extensionToFormat,
  getFileFormat,
  getMimeTypeForFormat,
  MetadataLink,
  MetadataLinkType,
  ProxyService,
} from '@geonetwork-ui/util/shared'
import type { FeatureCollection } from 'geojson'
import { from, Observable, throwError } from 'rxjs'
import { catchError, map, switchMap, tap } from 'rxjs/operators'

marker('wfs.unreachable.cors')
marker('wfs.unreachable.http')
marker('wfs.unreachable.unknown')
marker('wfs.featuretype.notfound')
marker('wfs.geojsongml.notsupported')
marker('dataset.error.network')
marker('dataset.error.http')
marker('dataset.error.parse')
marker('dataset.error.unknown')

interface WfsDownloadUrls {
  all: { [format: string]: string }
  geojson: string
  gml: { featureUrl: string; namespace: string }
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private proxy: ProxyService) {}

  private getDownloadUrlsFromWfs(
    wfsUrl: string,
    featureTypeName: string
  ): Observable<WfsDownloadUrls> {
    return from(
      new WfsEndpoint(this.proxy.getProxiedUrl(wfsUrl)).isReady()
    ).pipe(
      catchError((error) => {
        if (error.isCrossOriginRelated) {
          throw new Error(`wfs.unreachable.cors`)
        } else if (error.httpStatus) {
          throw new Error(`wfs.unreachable.http`)
        } else {
          throw new Error(`wfs.unreachable.unknown`)
        }
      }),
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
                outputFormat: 'application/json',
                outputCrs: 'EPSG:4326',
              })
            : null,
          gml:
            featureType.outputFormats.find((f) =>
              f.toLowerCase().includes('gml')
            ) && featureType.otherCrs?.includes('EPSG:4326')
              ? {
                  featureUrl: endpoint.getFeatureUrl(featureType.name, {
                    outputFormat: featureType.outputFormats.find((f) =>
                      f.toLowerCase().includes('gml')
                    ),
                    outputCrs: 'EPSG:4326',
                  }),
                  namespace: featureType.name,
                }
              : null,
        }
      })
    )
  }

  /* private getGeoJsonDownloadUrlFromWfs(
    wfsUrl: string,
    featureType: string
  ): Observable<string> {
    return this.getDownloadUrlsFromWfs(wfsUrl, featureType).pipe(
      map((urls) => urls.geojson),
      tap((url) => {
        if (url === null) {
          throw new Error('wfs.geojson.notsupported')
        }
      })
    )
  }*/

  private getDownloadUrlFromEsriRest(apiUrl: string, format: string): string {
    return this.proxy.getProxiedUrl(
      `${apiUrl}/query?f=${format}&where=1=1&outFields=*`
    )
  }

  getDownloadLinksFromWfs(wfsLink: MetadataLink): Observable<MetadataLink[]> {
    // Pour DL toutes les données
    return this.getDownloadUrlsFromWfs(wfsLink.url, wfsLink.name).pipe(
      map((urls) => urls.all),
      map((urls) =>
        Object.keys(urls).map((format) => ({
          ...wfsLink,
          url: urls[format],
          mimeType: getMimeTypeForFormat(extensionToFormat(format)) || format,
        }))
      )
    )
  }

  getDownloadLinksFromEsriRest(esriRestLink: MetadataLink): MetadataLink[] {
    return ['json', 'geojson'].map((format) => ({
      ...esriRestLink,
      url: this.getDownloadUrlFromEsriRest(esriRestLink.url, format),
      mimeType: getMimeTypeForFormat(extensionToFormat(format)) || format,
    }))
  }

  private interpretError(error: FetchError) {
    if (error.isCrossOriginOrNetworkRelated) {
      return throwError(() => new Error('dataset.error.network'))
    } else if (error.httpStatus) {
      return throwError(() => new Error('dataset.error.http'))
    } else if (error.parsingFailed) {
      return throwError(() => new Error('dataset.error.parse'))
    } else {
      return throwError(() => new Error('dataset.error.unknown'))
    }
  }

  readAsGeoJson(link: MetadataLink): Observable<FeatureCollection> {
    return this.getDataset(link).pipe(
      catchError(this.interpretError),
      switchMap((dataset) => dataset.selectAll().read()),
      map((features) => ({
        type: 'FeatureCollection',
        features,
      }))
    )
  }

  getDataset(link: MetadataLink): Observable<BaseReader> {
    const linkUrl = this.proxy.getProxiedUrl(link.url)
    if (link.type === MetadataLinkType.WFS) {
      return this.getDownloadUrlsFromWfs(linkUrl, link.name).pipe(
        switchMap((urls) => {
          if (urls.geojson) return openDataset(urls.geojson, 'geojson')
          if (urls.gml)
            return openDataset(urls.gml.featureUrl, 'gml', urls.gml.namespace)
          return null
        }),
        tap((url) => {
          if (url === null) {
            throw new Error('wfs.geojsongml.notsupported')
          }
        }),
        catchError(this.interpretError)
      )
    } else if (link.type === MetadataLinkType.DOWNLOAD) {
      const format = getFileFormat(link)
      const supportedType =
        SupportedTypes.indexOf(format as any) > -1
          ? (format as SupportedType)
          : undefined
      return from(openDataset(linkUrl, supportedType)).pipe(
        catchError(this.interpretError)
      )
    } else if (link.type === MetadataLinkType.ESRI_REST) {
      const url = this.getDownloadUrlFromEsriRest(linkUrl, 'geojson')
      return from(openDataset(url, 'geojson')).pipe(
        catchError(this.interpretError)
      )
    }
    return throwError('protocol not supported')
  }
}
