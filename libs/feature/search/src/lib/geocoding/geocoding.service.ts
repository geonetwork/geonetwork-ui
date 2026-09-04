import { Injectable, InjectionToken, inject } from '@angular/core'
import {
  queryGeoadmin,
  GeoadminOptions,
  GeocodingResult,
  queryGeonames,
  GeonamesOptions,
  BaseAdresseNationaleOptions,
  queryBaseAdresseNationale,
} from '@geospatial-sdk/geocoding'
import { from, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { getOptionalSearchConfig } from '@geonetwork-ui/util/app-config'

type GeoadminGeocodingProvider = ['geoadmin', GeoadminOptions]
type GeonamesGeocodingProvider = ['geonames', GeonamesOptions]
type BaseAdresseNationaleFrGeocodingProvider = [
  'base-adresse-nationale-fr',
  BaseAdresseNationaleOptions,
]
export type GeocodingProvider =
  | GeoadminGeocodingProvider
  | GeonamesGeocodingProvider
  | BaseAdresseNationaleFrGeocodingProvider

const DEFAULT_GEOCODING_PROVIDER = [
  'geonames',
  { maxRows: 5 },
] as GeocodingProvider

export const GEOCODING_PROVIDER = new InjectionToken<GeocodingProvider>(
  'geocoding-provider',
  {
    providedIn: 'root',
    factory: (): GeocodingProvider => {
      const config = getOptionalSearchConfig()
      if (!config?.GEOCODING_PROVIDER) {
        return DEFAULT_GEOCODING_PROVIDER
      }
      return [
        config.GEOCODING_PROVIDER,
        config.GEOCODING_PROVIDER_OPTIONS ?? {},
      ] as GeocodingProvider
    },
  }
)

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private provider = inject<GeocodingProvider>(GEOCODING_PROVIDER)

  query(text: string): Observable<GeocodingResult[]> {
    let queryObservable: Observable<GeocodingResult[]>
    switch (this.provider[0]) {
      case 'geoadmin':
        queryObservable = from(
          queryGeoadmin(text, this.provider[1] as GeoadminOptions)
        )
        break
      case 'geonames':
        queryObservable = from(
          queryGeonames(text, this.provider[1] as GeonamesOptions)
        )
        break
      case 'base-adresse-nationale-fr':
        queryObservable = from(
          queryBaseAdresseNationale(
            text,
            this.provider[1] as BaseAdresseNationaleOptions
          )
        )
        break
      default:
        return throwError(
          () => new Error(`Unsupported geocoding provider: ${this.provider[0]}`)
        )
    }
    return queryObservable.pipe(catchError((error) => throwError(error)))
  }
}
