import { Injectable } from '@angular/core'
import { LocationSearchResultModel } from './location-search-result.model'
import { catchError, map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class LocationSearchService {
  constructor(private http: HttpClient) {}

  getLocationSearch(query: string) {
    const requestUrl = new URL(
      'https://api3.geo.admin.ch/rest/services/api/SearchServer?origins=kantone,gg25&bbox=2485410,1078560,2679786,1261608&sortbbox=false&type=locations&sr=2056&lang=fr'
    )

    requestUrl.search = new URLSearchParams({
      origins: 'kantone,gg25',
      type: 'locations',
      sr: '2056',
      lang: 'fr',
      searchText: query,
    }).toString()
    return this.http.get<LocationSearchResultModel>(requestUrl.toString()).pipe(
      map((responseData) => {
        return responseData.results
      }),
      catchError((error) => {
        console.warn('Loction search failed')
        return of([])
      })
    )
  }

  // attrs.id
  // 2nd request to get the feature of the selected location?
  // https://api3.geo.admin.ch/rest/services/api/SearchServer?type=featuresearch&
}
