import { Component, OnDestroy } from '@angular/core'
import { queryGeoadmin, GeoadminOptions } from '@geospatial-sdk/geocoding'
import { catchError, from, Subject, takeUntil } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'
import { MapManagerService } from '../manager/map-manager.service'
import { fromLonLat } from 'ol/proj'
import { Polygon } from 'ol/geom'

@Component({
  selector: 'gn-ui-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.css'],
})
export class GeocodingComponent implements OnDestroy {
  searchText = ''
  results: any[] = []
  searchTextChanged = new Subject<string>()
  destroy$ = new Subject<void>()

  constructor(private mapManager: MapManagerService) {
    this.searchTextChanged
      .pipe(
        debounceTime(300),
        switchMap((searchText) => {
          const options: GeoadminOptions = {
            origins: ['zipcode', 'gg25', 'address'],
            limit: 6,
          }
          return from(queryGeoadmin(searchText, options)).pipe(
            catchError((error) => {
              console.error(error)
              return []
            })
          )
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((results) => {
        this.results = results
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onSearchChange(searchText: string) {
    if (!searchText) {
      this.clearSearch()
      return
    } else {
      this.searchTextChanged.next(searchText)
    }
  }

  clearSearch() {
    this.searchText = ''
    this.results = []
  }

  zoomToLocation(result) {
    const map = this.mapManager.map
    const view = map.getView()
    const geometry = result.geom

    const polygonCoords = geometry.coordinates
    const transformedCoords = polygonCoords[0].map((coord) => fromLonLat(coord))

    const polygon = new Polygon([transformedCoords])

    view.fit(polygon, {
      duration: 100,
      maxZoom: 12,
    })
  }

  onEnterPress() {
    if (this.results && this.results.length > 0) {
      this.zoomToLocation(this.results[0])
    }
  }
}
