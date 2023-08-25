import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  FeatureInfoService,
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapManagerService,
  MapStyleService,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import { getOptionalMapConfig, MapConfig } from '@geonetwork-ui/util/app-config'
import { getLinkLabel, ProxyService } from '@geonetwork-ui/util/shared'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'
import { StyleLike } from 'ol/style/Style'
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs'
import {
  catchError,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetDistribution } from '@geonetwork-ui/common/domain/record'

@Component({
  selector: 'gn-ui-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent implements OnInit, OnDestroy {
  mapConfig: MapConfig = getOptionalMapConfig()
  selection: Feature<Geometry>
  private subscription = new Subscription()
  private selectionStyle: StyleLike

  compatibleMapLinks$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.geoDataLinks$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinks]) => [...mapApiLinks, ...geoDataLinks])
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
    switchMap((layers) =>
      this.mapUtils.getLayerExtent(layers[0]).pipe(
        catchError((error) => {
          console.warn(error) // FIXME: report this to the user somehow
          return of(undefined)
        }),
        map(
          (extent) =>
            ({
              layers,
              view: {
                extent,
              },
            } as MapContextModel)
        ),
        tap(() => this.resetSelection())
      )
    )
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private mapManager: MapManagerService,
    private mapUtils: MapUtilsService,
    private dataService: DataService,
    private proxy: ProxyService,
    private featureInfo: FeatureInfoService,
    private changeRef: ChangeDetectorRef,
    private styleService: MapStyleService
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {
    this.mapUtils.prioritizePageScroll(this.mapManager.map.getInteractions())
    this.selectionStyle = this.styleService.styles.defaultHL
    this.featureInfo.handleFeatureInfo()
    this.subscription.add(
      this.featureInfo.features$.subscribe((features) => {
        this.onMapFeatureSelect(features)
      })
    )
  }

  onMapFeatureSelect(features: Feature<Geometry>[]): void {
    this.resetSelection()
    this.selection = features?.length > 0 && features[0]
    if (this.selection) {
      this.selection.setStyle(this.selectionStyle)
    }
    this.changeRef.detectChanges()
  }

  resetSelection(): void {
    if (this.selection) {
      this.selection.setStyle(null)
    }
    this.selection = null
  }

  getLayerFromLink(
    link: DatasetDistribution
  ): Observable<MapContextLayerModel> {
    if (link.type === 'service' && link.accessServiceProtocol === 'wms') {
      return of({
        url: link.url.toString(),
        type: MapContextLayerTypeEnum.WMS,
        name: link.name,
      })
    } else if (
      link.type === 'service' &&
      link.accessServiceProtocol === 'wmts'
    ) {
      return this.mapUtils.getWmtsOptionsFromCapabilities(link).pipe(
        map((options) => ({
          type: MapContextLayerTypeEnum.WMTS,
          options: options,
        }))
      )
    } else if (
      (link.type === 'service' &&
        (link.accessServiceProtocol === 'wfs' ||
          link.accessServiceProtocol === 'esriRest')) ||
      link.type === 'download'
    ) {
      return this.dataService.readAsGeoJson(link).pipe(
        map((data) => ({
          type: MapContextLayerTypeEnum.GEOJSON,
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
