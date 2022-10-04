import { Injectable } from '@angular/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { WfsEndpoint } from '@camptocamp/ogc-client'
import { readDataset, SupportedType } from '@geonetwork-ui/data-fetcher'
import { MetadataLinkValid, ProxyService } from '@geonetwork-ui/util/shared'
import type { FeatureCollection } from 'geojson'
import { from, Observable, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

marker('wfs.unreachable.cors')
marker('wfs.unreachable.http')
marker('wfs.unreachable.unknown')
marker('wfs.featuretype.notfound')
marker('wfs.geojson.notsupported')
marker('dataset.error.network')
marker('dataset.error.http')
marker('dataset.error.parse')
marker('dataset.error.unknown')

interface WfsDownloadUrls {
  all: { [format: string]: string }
  geojson: string
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
      // eslint-disable-next-line -- ogc-client lacks typing
      map((endpoint: any) => {
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
        }
      })
    )
  }

  getGeoJsonDownloadUrlFromWfs(
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
  }

  private getDownloadUrlFromEsriRest(apiUrl: string, format: string): string {
    return this.proxy.getProxiedUrl(
      `${apiUrl}/query?f=${format}&where=1=1&outFields=*`
    )
  }

  getGeoJsonDownloadUrlFromEsriRest(apiUrl: string): string {
    return this.getDownloadUrlFromEsriRest(apiUrl, 'geojson')
  }

  getDownloadLinksFromWfs(
    wfsLink: MetadataLinkValid
  ): Observable<MetadataLinkValid[]> {
    return this.getDownloadUrlsFromWfs(wfsLink.url, wfsLink.name).pipe(
      map((urls) => urls.all),
      map((urls) =>
        Object.keys(urls).map((format) => ({
          ...wfsLink,
          url: urls[format],
          format: format,
        }))
      )
    )
  }

  getDownloadLinksFromEsriRest(
    esriRestLink: MetadataLinkValid
  ): MetadataLinkValid[] {
    return ['json', 'geojson'].map((format) => ({
      ...esriRestLink,
      url: this.getDownloadUrlFromEsriRest(esriRestLink.url, format),
      format: `REST:${format}`,
    }))
  }

  readDataset(
    url: string,
    typeHint?: SupportedType
  ): Observable<FeatureCollection> {
    const proxiedUrl = this.proxy.getProxiedUrl(url)
    return from(readDataset(proxiedUrl, typeHint)).pipe(
      catchError((error) => {
        if (error.isCrossOriginOrNetworkRelated) {
          return throwError(new Error('dataset.error.network'))
        } else if (error.httpStatus) {
          return throwError(new Error('dataset.error.http'))
        } else if (error.parsingFailed) {
          return throwError(new Error('dataset.error.parse'))
        } else {
          return throwError(new Error('dataset.error.unknown'))
        }
      }),
      map((features) => ({
        type: 'FeatureCollection',
        features,
      }))
    )
  }

  readGeoJsonDataset(url: string): Observable<FeatureCollection> {
    return this.readDataset(url, 'geojson')
  }
}
