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

type GeoadminGeocodingProvider = ['geoadmin', GeoadminOptions]
type GeonamesGeocodingProvider = ['geonames', GeonamesOptions]
type GeoplateformeGeocodingProvider = ['geoplateforme', GeoplateformeOptions]
export type GeocodingProvider =
  | GeoadminGeocodingProvider
  | GeonamesGeocodingProvider
  | GeoplateformeGeocodingProvider

export const DEFAULT_GEOCODING_PROVIDER = [
  'geonames',
  { maxRows: 5 },
] as GeocodingProvider

export const GEOCODING_PROVIDER = new InjectionToken<GeocodingProvider>(
  'geocoding-provider',
  {
    providedIn: 'root',
    factory: (): GeocodingProvider => DEFAULT_GEOCODING_PROVIDER,
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
