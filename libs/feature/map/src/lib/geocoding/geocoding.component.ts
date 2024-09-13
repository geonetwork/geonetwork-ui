import { Component, OnDestroy } from '@angular/core'
import { catchError, firstValueFrom, from, Subject, takeUntil } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'
import { GeocodingService } from '../geocoding.service'
import { MapFacade } from '../+state/map.facade'

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
    private mapFacade: MapFacade,
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
    const geometry = result.geom

    if (geometry.type === 'Point') {
      this.zoomToPoint(geometry.coordinates)
    } else if (geometry.type === 'Polygon') {
      this.zoomToPolygon(geometry.coordinates)
    } else {
      console.error(`Unsupported geometry type: ${geometry.type}`)
    }
  }

  async zoomToPoint(pointCoords: [number, number]) {
    const context = await firstValueFrom(this.mapFacade.context$)
    this.mapFacade.applyContext({
      ...context,
      // TODO: change context to fit point
    })
  }

  async zoomToPolygon(polygonCoords: [[number, number][]]) {
    const context = await firstValueFrom(this.mapFacade.context$)
    this.mapFacade.applyContext({
      ...context,
      // TODO: change context to fit polygon
    })
  }

  onEnterPress() {
    if (this.results && this.results.length > 0) {
      this.zoomToLocation(this.results[0])
    }
  }
}
