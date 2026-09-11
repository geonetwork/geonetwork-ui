import { Injectable, InjectionToken, inject } from '@angular/core'
import {
  queryGeoadmin,
  GeoadminOptions,
  GeocodingResult,
  queryGeonames,
  GeonamesOptions,
  GeoplateformeOptions,
  queryGeoplateforme,
} from '@geospatial-sdk/geocoding'
import { from, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { getOptionalSearchConfig } from '@geonetwork-ui/util/app-config'

type GeoadminGeocodingProvider = ['geoadmin', GeoadminOptions]
type GeonamesGeocodingProvider = ['geonames', GeonamesOptions]
type GeoplateformeGeocodingProvider = ['geoplateforme', GeoplateformeOptions]
export type GeocodingProvider =
  | GeoadminGeocodingProvider
  | GeonamesGeocodingProvider
  | GeoplateformeGeocodingProvider

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
      case 'geoplateforme':
        queryObservable = from(
          queryGeoplateforme(text, this.provider[1] as GeoplateformeOptions)
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
