import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
} from '@angular/core'
import { MapUtilsService } from '@geonetwork-ui/feature/map'
import { getLinkLabel } from '@geonetwork-ui/util/shared'
import {
  BehaviorSubject,
  combineLatest,
  from,
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
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import { DatasetOnlineResource } from '@geonetwork-ui/common/domain/model/record'
import {
  createViewFromLayer,
  MapContext,
  MapContextLayer,
} from '@geospatial-sdk/core'
import {
  FeatureDetailComponent,
  MapContainerComponent,
  prioritizePageScroll,
  MapLegendComponent,
} from '@geonetwork-ui/ui/map'
import { Feature } from 'geojson'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import { matClose } from '@ng-icons/material-icons/baseline'
import { CommonModule } from '@angular/common'
import {
  ButtonComponent,
  DropdownSelectorComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslateModule } from '@ngx-translate/core'
import { ExternalViewerButtonComponent } from '../external-viewer-button/external-viewer-button.component'
import {
  LoadingMaskComponent,
  PopupAlertComponent,
} from '@geonetwork-ui/ui/widgets'

@Component({
  selector: 'gn-ui-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    DropdownSelectorComponent,
    MapContainerComponent,
    FeatureDetailComponent,
    PopupAlertComponent,
    TranslateModule,
    LoadingMaskComponent,
    NgIconComponent,
    ExternalViewerButtonComponent,
    ButtonComponent,
    MapLegendComponent,
  ],
  viewProviders: [provideIcons({ matClose })],
})
export class MapViewComponent implements AfterViewInit {
  @Input() excludeWfs = false
  @ViewChild('mapContainer') mapContainer: MapContainerComponent

  selection: Feature
  showLegend = true
  legendExists = false

  toggleLegend() {
    this.showLegend = !this.showLegend
  }

  onLegendStatusChange(status: boolean) {
    this.legendExists = status
    if (!status) {
      this.showLegend = false
    }
  }

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
      this.excludeWfs
        ? links.filter((link) => link.accessServiceProtocol !== 'wfs')
        : links
    ),
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

  mapContext$: Observable<MapContext> = this.currentLayers$.pipe(
    switchMap((layers) =>
      from(createViewFromLayer(layers[0])).pipe(
        catchError(() => of(null)), // could not zoom on the layer: use the record extent
        map((view) => ({
          layers,
          view,
        })),
        tap(() => {
          this.resetSelection()
        })
      )
    ),
    startWith({
      layers: [],
      view: null,
    }),
    withLatestFrom(this.mdViewFacade.metadata$),
    map(([context, metadata]) => {
      if (context.view) return context
      const extent = this.mapUtils.getRecordExtent(metadata)
      const view = extent ? { extent } : null
      return {
        ...context,
        view,
      }
    }),
    shareReplay(1)
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private mapUtils: MapUtilsService,
    private dataService: DataService,
    private changeRef: ChangeDetectorRef
  ) {}

  async ngAfterViewInit() {
    const map = await this.mapContainer.openlayersMap
    prioritizePageScroll(map.getInteractions())
  }

  onMapFeatureSelect(features: Feature[]): void {
    this.resetSelection()
    this.selection = features?.length > 0 && features[0]
    if (this.selection) {
      // FIXME: restore styling of selected feature
      // this.selection.setStyle(this.selectionStyle)
    }
    this.changeRef.detectChanges()
  }

  resetSelection(): void {
    if (this.selection) {
      // FIXME: restore styling of selected feature
      // this.selection.setStyle(null)
    }
    this.selection = null
  }

  getLayerFromLink(link: DatasetOnlineResource): Observable<MapContextLayer> {
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
