import { Component, OnDestroy } from '@angular/core'
import { catchError, from, Subject, takeUntil } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'
import { MapManagerService } from '../manager/map-manager.service'
import { fromLonLat } from 'ol/proj'
import { Polygon } from 'ol/geom'
import { GeocodingService } from '../geocoding.service'

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
  errorMessage: string | null = null

  constructor(
    private mapManager: MapManagerService,
    private geocodingService: GeocodingService
  ) {
    this.searchTextChanged
      .pipe(
        debounceTime(300),
        switchMap((searchText) => {
          return from(this.geocodingService.query(searchText)).pipe(
            catchError((error) => {
              this.errorMessage =
                'An error occurred while searching. Please try again.'
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
    this.errorMessage = null
  }

  zoomToLocation(result: any) {
    const map = this.mapManager.map
    const view = map.getView()
    const geometry = result.geom

    if (geometry.type === 'Point') {
      this.zoomToPoint(geometry.coordinates, view)
    } else if (geometry.type === 'Polygon') {
      this.zoomToPolygon(geometry.coordinates, view)
    } else {
      console.error(`Unsupported geometry type: ${geometry.type}`)
    }
  }

  zoomToPoint(pointCoords: [number, number], view: any) {
    const transformedCoords = fromLonLat(pointCoords)
    view.setCenter(transformedCoords)
    view.setZoom(12)
  }

  zoomToPolygon(polygonCoords: [[number, number][]], view: any) {
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
