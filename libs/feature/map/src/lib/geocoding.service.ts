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

export const GEOCODING_PROVIDER = new InjectionToken('geocoding-provider')

export interface GeocodingProvider {
  id: 'geoadmin' | 'geonames' | 'data-gouv-fr'
  options: GeoadminOptions | GeonamesOptions | DataGouvFrOptions
}

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  constructor(
    @Inject(GEOCODING_PROVIDER) private provider: GeocodingProvider
  ) {}

  query(text: string): Observable<GeocodingResult[]> {
    let queryObservable: Observable<GeocodingResult[]>
    switch (this.provider.id) {
      case 'geoadmin':
        queryObservable = from(
          queryGeoadmin(text, this.provider.options as GeoadminOptions)
        )
        break
      case 'geonames':
        queryObservable = from(
          queryGeonames(text, this.provider.options as GeonamesOptions)
        )
        break
      case 'data-gouv-fr':
        queryObservable = from(
          queryDataGouvFr(text, this.provider.options as DataGouvFrOptions)
        )
        break
      default:
        return throwError(
          () => new Error(`Unsupported geocoding provider: ${this.provider.id}`)
        )
    }
    return queryObservable.pipe(catchError((error) => throwError(error)))
  }
}
