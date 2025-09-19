import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { MapUtilsService } from '@geonetwork-ui/feature/map'
import { getLinkId, getLinkLabel } from '@geonetwork-ui/util/shared'
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
  take,
  tap,
} from 'rxjs/operators'
import { MdViewFacade } from '../state/mdview.facade'
import { DataService } from '@geonetwork-ui/feature/dataviz'
import {
  DatasetOnlineResource,
  DatasetServiceDistribution,
} from '@geonetwork-ui/common/domain/model/record'
import {
  createViewFromLayer,
  MapContext,
  MapContextLayer,
  SourceLoadErrorEvent,
} from '@geospatial-sdk/core'
import {
  FeatureDetailComponent,
  MapContainerComponent,
  MapLegendComponent,
  prioritizePageScroll,
} from '@geonetwork-ui/ui/map'
import { Feature } from 'geojson'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matClose } from '@ng-icons/material-icons/baseline'
import { CommonModule } from '@angular/common'
import {
  ButtonComponent,
  DropdownSelectorComponent,
} from '@geonetwork-ui/ui/inputs'
import {
  TranslateDirective,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core'
import { ExternalViewerButtonComponent } from '../external-viewer-button/external-viewer-button.component'
import {
  LoadingMaskComponent,
  PopupAlertComponent,
} from '@geonetwork-ui/ui/widgets'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { FetchError } from '@geonetwork-ui/data-fetcher'

marker('map.dropdown.placeholder')
marker('wfs.feature.limit')
marker('dataset.error.restrictedAccess')
marker('map.select.style')

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
    TranslateDirective,
    TranslatePipe,
    LoadingMaskComponent,
    NgIconComponent,
    ExternalViewerButtonComponent,
    ButtonComponent,
    MapLegendComponent,
  ],
  viewProviders: [
    provideIcons({ matClose }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class MapViewComponent implements AfterViewInit {
  @Input() set exceedsLimit(value: boolean) {
    this.excludeWfs$.next(value)
  }
  linkFromConfig$ = new BehaviorSubject(null)
  _selectedChoice = null
  _styleFromConfig = null

  linkMap: Map<string, DatasetOnlineResource> = new Map()
  @Input() set selectedView(value: string) {
    this.selectedView$.next(value)
  }
  @Input() set datavizConfig(value: any) {
    if (value && value.view === 'map') {
      this.selectedView$.next(value.view)
      if (value.styleTMSIndex) {
        this._styleFromConfig = value.styleTMSIndex
      }
      if (value.source) {
        this.linkFromConfig$.next(value.source)
      }
    }
  }
  @Input() displaySource = true
  @Output() linkSelected = new EventEmitter<DatasetOnlineResource>()
  @Output() styleSelected = new EventEmitter<number>()
  @ViewChild('mapContainer') mapContainer: MapContainerComponent

  excludeWfs$ = new BehaviorSubject(false)
  hidePreview = false
  selection: Feature
  showLegend = true
  legendExists = false
  loading = false
  error = null

  selectLinkToDisplay(id: string) {
    this.selectedLinkId$.next(id)
  }

  selectStyleToDisplay(i: number) {
    this.selectedStyleId$.next(i)
    this.styleSelected.emit(i)
  }

  toggleLegend() {
    this.showLegend = !this.showLegend
  }
  onLegendStatusChange(v: boolean) {
    this.legendExists = v
  }

  compatibleMapLinks$ = combineLatest([
    this.mdViewFacade.mapApiLinks$,
    this.mdViewFacade.geoDataLinksWithGeometry$,
  ]).pipe(
    map(([mapApiLinks, geoDataLinksWithGeometry]) => [
      ...mapApiLinks,
      ...geoDataLinksWithGeometry,
    ]),
    shareReplay(1)
  )

  dropdownChoices$ = this.compatibleMapLinks$.pipe(
    map((links) => {
      this.linkMap.clear()
      links.forEach((link: DatasetOnlineResource) =>
        this.linkMap.set(getLinkId(link), link)
      )
      return links.length
        ? links.map((link) => ({
            label: getLinkLabel(link),
            value: getLinkId(link),
          }))
        : [{ label: 'map.dropdown.placeholder', value: '' }]
    })
  )

  selectedView$ = new BehaviorSubject(null)
  selectedLinkId$ = new BehaviorSubject(null)
  selectedStyleId$ = new BehaviorSubject(null)

  selectedSourceLink$ = combineLatest([
    this.compatibleMapLinks$,
    this.linkFromConfig$,
    this.selectedLinkId$.pipe(distinctUntilChanged()),
    this.selectedView$,
  ]).pipe(
    tap(() => {
      this.error = null
    }),
    map(([compatibleLinks, configLink, id, view]) => {
      if (view === 'map') {
        if (
          configLink &&
          !id &&
          compatibleLinks.some(
            (link) => getLinkId(link) === getLinkId(configLink)
          )
        ) {
          this._selectedChoice = getLinkId(configLink)
          this.linkSelected.emit(configLink)
          return configLink
        } else if (id) {
          this._selectedChoice = id
          this.linkSelected.emit(this.linkMap.get(id))
          return this.linkMap.get(id)
        } else {
          this.linkSelected.emit(compatibleLinks[0])
          return compatibleLinks[0]
        }
      }
    })
  )

  styleLinks$ = this.selectedSourceLink$.pipe(
    switchMap((src) => {
      if (
        src &&
        src.type === 'service' &&
        src.accessServiceProtocol === 'tms'
      ) {
        return from(
          // WARNING: when using "getGeodataLinksFromTms", make sure to add error handling to prevent the rest of the logic from failing
          // this may happen when TMS endpoint is in error
          this.dataService.getGeodataLinksFromTms(
            src as DatasetServiceDistribution,
            false
          )
        ).pipe(
          // We need to check for maplibre-style links because when a TMS service has no styles,
          // getGeodataLinksFromTms returns the original TMS link, which isn't a maplibre-style link
          map(
            (links) =>
              links?.filter(
                (link) =>
                  link.type === 'service' &&
                  link.accessServiceProtocol === 'maplibre-style'
              ) || []
          ),
          catchError((error) => {
            this.handleError(error)
            return of(src)
          })
        )
      }
      return of([])
    }),
    tap((styles) => {
      if (this._styleFromConfig && this._styleFromConfig <= styles.length) {
        this.selectedStyleId$.next(this._styleFromConfig)
      } else {
        this.selectedStyleId$.next(0)
      }
    }),
    shareReplay(1)
  )

  styleDropdownChoices$ = this.styleLinks$.pipe(
    map((links) =>
      links.length
        ? links.map((link, index) => ({
            label: getLinkLabel(link),
            value: index,
          }))
        : [
            {
              label: '\u00A0\u00A0\u00A0\u00A0',
              value: 0,
            },
          ]
    )
  )

  selectedLink$ = combineLatest([
    this.selectedSourceLink$,
    this.styleLinks$,
    this.selectedStyleId$.pipe(distinctUntilChanged()),
  ]).pipe(
    map(([src, styles, styleIdx]) => (styles.length ? styles[styleIdx] : src)),
    shareReplay(1)
  )

  currentLayers$ = combineLatest([this.selectedLink$, this.excludeWfs$]).pipe(
    switchMap(([link, excludeWfs]) => {
      if (!link) {
        return of([])
      }
      if (excludeWfs && link.accessServiceProtocol === 'wfs') {
        this.hidePreview = true
        return of([])
      }
      this.hidePreview = false
      this.loading = true
      if (link.accessRestricted) {
        this.handleError('dataset.error.restrictedAccess')
        return of([])
      }
      return this.getLayerFromLink(link).pipe(
        map((layer) => [layer]),
        catchError((e) => {
          this.handleError(e)
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
    private changeRef: ChangeDetectorRef,
    private translateService: TranslateService
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

  onSourceLoadError(error: SourceLoadErrorEvent) {
    if (error.httpStatus === 403 || error.httpStatus === 401) {
      this.error = this.translateService.instant(`dataset.error.forbidden`)
    } else {
      this.error = this.translateService.instant(`dataset.error.http`, {
        info: error.httpStatus,
      })
    }
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
      link.accessServiceProtocol === 'tms'
    ) {
      // FIXME: here we're assuming that the TMS serves vector tiles only; should be checked with ogc-client first
      return of({
        url: link.url
          .toString()
          .replace(/\/?$/, `/${link.name}/{z}/{x}/{y}.pbf`),
        type: 'xyz',
        tileFormat: 'application/vnd.mapbox-vector-tile',
        name: link.name,
      })
    } else if (
      link.type === 'service' &&
      link.accessServiceProtocol === 'maplibre-style'
    ) {
      return of({
        type: 'maplibre-style',
        name: link.name,
        styleUrl: link.url.toString(),
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
      const cacheActive = true // TODO implement whether should be true or false
      return this.dataService.readAsGeoJson(link, cacheActive).pipe(
        map((data) => ({
          type: 'geojson',
          data,
        }))
      )
    }
    return throwError(() => 'protocol not supported')
  }
  handleError(error: FetchError | Error | string) {
    if (error instanceof FetchError) {
      this.error = this.translateService.instant(
        `dataset.error.${error.type}`,
        {
          info: error.info,
        }
      )
      console.warn(error.message)
    } else if (error instanceof Error) {
      this.error = this.translateService.instant(error.message)
      console.warn(error.stack || error)
    } else {
      this.error = this.translateService.instant(error)
      console.warn(error)
    }
    this.loading = false
    this.changeRef.detectChanges()
  }
}
