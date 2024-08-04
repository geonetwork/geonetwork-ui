import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
} from '@angular/core'
import { MapStyleService, MapUtilsService } from '@geonetwork-ui/feature/map'
import { getLinkLabel } from '@geonetwork-ui/util/shared'
import { StyleLike } from 'ol/style/Style'
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  startWith,
  throwError,
  withLatestFrom,
} from 'rxjs'
import {
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
} from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/model/record'
import { MapContext, MapContextLayer } from '@geospatial-sdk/core'
import {
  MapContainerComponent,
  prioritizePageScroll,
} from '@geonetwork-ui/ui/map'
import { Feature } from 'geojson'

@Component({
  selector: 'gn-ui-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild(MapContainerComponent) mapContainer: MapContainerComponent

  selection: Feature
  private selectionStyle: StyleLike

  compatibleMapLinks$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry]) => {
      return [...mapApiLinks, ...geoDataLinksWithGeometry]
    })
  )

  dropdownChoices$ = this.compatibleMapLinks$.pipe(
    map((links) =>
      links.length
        ? links.map((link, index) => ({
            label: getLinkLabel(link),
            value: index,
          }))
        : [{ label: 'No preview layer', value: 0 }]
    )
  )
  selectedLinkIndex$ = new BehaviorSubject(0)

  loading = false
  error = null

  selectedLink$ = combineLatest([
    this.compatibleMapLinks$,
    this.selectedLinkIndex$.pipe(distinctUntilChanged()),
  ]).pipe(map(([links, index]) => links[index]))

  currentLayers$ = this.selectedLink$.pipe(
    switchMap((link) => {
      if (!link) {
        return of([])
      }
      this.loading = true
      this.error = null
      return this.getLayerFromLink(link).pipe(
        map((layer) => [layer]),
        catchError((e) => {
          this.error = e.message
          console.warn(e.stack || e.message)
          return of([])
        }),
        finalize(() => (this.loading = false))
      )
    })
  )

  mapContext$ = this.currentLayers$.pipe(
    // switchMap((layers) =>
    //   from(this.mapUtils.getLayerExtent(layers[0])).pipe(
    //     catchError(() => {
    //       this.error = 'The layer has no extent'
    //       return of(undefined)
    //     }),
    //     map(
    //       (extent) =>
    //         ({
    //           layers,
    //           view: {
    //             extent,
    //           },
    //         } as MapContext)
    //     ),
    //     tap((res) => {
    //       this.resetSelection()
    //     })
    //   )
    // ),
    map(
      (layers) =>
        ({
          layers,
          view: {},
        } as MapContext)
    ),
    startWith({
      layers: [],
      view: {},
    } as MapContext),
    withLatestFrom(this.mdViewFacade.metadata$),
    map(([context, metadata]) => {
      if (context.view.extent) return context
      const extent = this.mapUtils.getRecordExtent(metadata)
      return {
        ...context,
        view: {
          ...context.view,
          extent,
        },
      }
    })
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private mapUtils: MapUtilsService,
    private dataService: DataService,
    private changeRef: ChangeDetectorRef,
    private styleService: MapStyleService
  ) {}

  async ngAfterViewInit() {
    const map = await this.mapContainer.openlayersMap
    prioritizePageScroll(map.getInteractions())
    this.selectionStyle = this.styleService.styles.defaultHL
  }

  onMapFeatureSelect(features: Feature[]): void {
    this.resetSelection()
    this.selection = features?.length > 0 && features[0]
    // if (this.selection) {
    //   this.selection.setStyle(this.selectionStyle)
    // }
    this.changeRef.detectChanges()
  }

  resetSelection(): void {
    // if (this.selection) {
    //   this.selection.setStyle(null)
    // }
    this.selection = null
  }

  getLayerFromLink(link: DatasetDistribution): Observable<MapContextLayer> {
    if (link.type === 'service' && link.accessServiceProtocol === 'wms') {
      return of({
        url: link.url.toString(),
        type: 'wms',
        name: link.name,
      })
    } else if (
      link.type === 'service' &&
      link.accessServiceProtocol === 'wmts'
    ) {
      return of({
        url: link.url.toString(),
        type: 'wmts',
        name: link.name,
      })
    } else if (
      (link.type === 'service' &&
        (link.accessServiceProtocol === 'wfs' ||
          link.accessServiceProtocol === 'esriRest' ||
          link.accessServiceProtocol === 'ogcFeatures')) ||
      link.type === 'download'
    ) {
      return this.dataService.readAsGeoJson(link).pipe(
        map((data) => ({
          type: 'geojson',
          data,
        }))
      )
    }
    return throwError(() => 'protocol not supported')
  }

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }
}
