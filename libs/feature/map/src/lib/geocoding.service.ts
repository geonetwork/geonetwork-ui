import { Injectable, Inject, InjectionToken } from '@angular/core'
import {
  queryGeoadmin,
  GeoadminOptions,
  GeocodingResult,
  queryGeonames,
  GeonamesOptions,
  DataGouvFrOptions,
  queryDataGouvFr,
} from '@geospatial-sdk/geocoding'
import { from, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

type GeoadminGeocodingProvider = ['geoadmin', GeoadminOptions]
type GeonamesGeocodingProvider = ['geonames', GeonamesOptions]
type DataGouvFrGeocodingProvider = ['data-gouv-fr', DataGouvFrOptions]
export type GeocodingProvider =
  | GeoadminGeocodingProvider
  | GeonamesGeocodingProvider
  | DataGouvFrGeocodingProvider

export const GEOCODING_PROVIDER = new InjectionToken<GeocodingProvider>(
  'geocoding-provider'
)

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(
    @Inject(GEOCODING_PROVIDER) private provider: GeocodingProvider
  ) {}

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
      case 'data-gouv-fr':
        queryObservable = from(
          queryDataGouvFr(text, this.provider[1] as DataGouvFrOptions)
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
