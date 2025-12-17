import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { fromEvent, merge, Observable, of, timer } from 'rxjs'
import { delay, map, startWith, switchMap } from 'rxjs/operators'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { CommonModule } from '@angular/common'
import { TranslateDirective } from '@ngx-translate/core'
import {
  computeMapContextDiff,
  Extent,
  FeaturesClickEvent,
  FeaturesClickEventType,
  FeaturesHoverEvent,
  FeaturesHoverEventType,
  MapClickEvent,
  MapClickEventType,
  MapExtentChangeEvent,
  MapExtentChangeEventType,
  MapContext,
  MapContextLayerXyz,
  MapContextView,
  MapEventsByType,
  SourceLoadErrorEvent,
  SourceLoadErrorType,
} from '@geospatial-sdk/core'
import {
  applyContextDiffToMap,
  createMapFromContext,
  listen,
} from '@geospatial-sdk/openlayers'
import type OlMap from 'ol/Map.js'
import type { Feature } from 'geojson'
import {
  BASEMAP_LAYERS,
  DO_NOT_USE_DEFAULT_BASEMAP,
  MAP_VIEW_CONSTRAINTS,
} from './map-settings.token'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { matSwipeOutline } from '@ng-icons/material-icons/outline'
import { transformExtent } from 'ol/proj.js'

const DEFAULT_BASEMAP_LAYER: MapContextLayerXyz = {
  type: 'xyz',
  url: `https://{a-c}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png`,
  attributions: `<span>© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a></span>`,
}

const DEFAULT_VIEW: MapContextView = {
  center: [0, 15],
  zoom: 2,
}

@Component({
  selector: 'gn-ui-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateDirective, NgIconComponent],
  providers: [
    provideIcons({ matSwipeOutline }),
    provideNgIconsConfig({
      size: '1.5em',
    }),
  ],
})
export class MapContainerComponent implements AfterViewInit, OnChanges {
  private doNotUseDefaultBasemap = inject(DO_NOT_USE_DEFAULT_BASEMAP)
  private basemapLayers = inject(BASEMAP_LAYERS)
  private mapViewConstraints = inject<{
    maxZoom?: number
    maxExtent?: Extent
  }>(MAP_VIEW_CONSTRAINTS)
  private destroyRef = inject(DestroyRef)

  @Input() context: MapContext | null

  @ViewChild('map') container: ElementRef

  private olMap: OlMap
  private olMapResolver: (value: OlMap) => void

  displayMessage$: Observable<boolean>
  openlayersMap = new Promise<OlMap>((resolve) => {
    this.olMapResolver = resolve
  })

  // These events only get registered on the map if they are used
  _featuresClick: EventEmitter<Feature[]> = null
  _featuresHover: EventEmitter<Feature[]> = null
  _mapClick: EventEmitter<[number, number]> = null
  _extentChange: EventEmitter<Extent> = null
  _sourceLoadError: EventEmitter<SourceLoadErrorEvent> = null
  _resolvedExtentChange: EventEmitter<Extent> = null

  @Output() get featuresClick() {
    if (!this._featuresClick) {
      this.setupEventListener(
        FeaturesClickEventType,
        (event: FeaturesClickEvent) => {
          this._featuresClick.emit(event.features)
        }
      )
      this._featuresClick = new EventEmitter<Feature[]>()
    }
    return this._featuresClick
  }

  @Output() get featuresHover() {
    if (!this._featuresHover) {
      this.setupEventListener(
        FeaturesHoverEventType,
        (event: FeaturesHoverEvent) => {
          this._featuresHover.emit(event.features)
        }
      )
      this._featuresHover = new EventEmitter<Feature[]>()
    }
    return this._featuresHover
  }

  @Output() get mapClick() {
    if (!this._mapClick) {
      this.setupEventListener(MapClickEventType, (event: MapClickEvent) => {
        this._mapClick.emit(event.coordinate)
      })
      this._mapClick = new EventEmitter<[number, number]>()
    }
    return this._mapClick
  }

  @Output() get extentChange() {
    if (!this._extentChange) {
      this.setupEventListener(
        MapExtentChangeEventType,
        (event: MapExtentChangeEvent) => {
          this._extentChange.emit(event.extent as Extent)
        }
      )
      this._extentChange = new EventEmitter<Extent>()
    }
    return this._extentChange
  }

  @Output() get sourceLoadError() {
    if (!this._sourceLoadError) {
      this.setupEventListener(
        SourceLoadErrorType,
        (event: SourceLoadErrorEvent) => {
          this._sourceLoadError.emit(event)
        }
      )
      this._sourceLoadError = new EventEmitter<SourceLoadErrorEvent>()
    }
    return this._sourceLoadError
  }

  @Output() get resolvedExtentChange() {
    if (!this._resolvedExtentChange) {
      this._resolvedExtentChange = new EventEmitter<Extent>()
    }
    return this._resolvedExtentChange
  }

  calculateCurrentMapExtent(): Extent {
    const extent = this.olMap.getView().calculateExtent(this.olMap.getSize())
    const reprojectedExtent = transformExtent(
      extent,
      this.olMap.getView().getProjection(),
      'EPSG:4326'
    )

    return reprojectedExtent as Extent
  }

  async ngAfterViewInit() {
    this.olMap = await createMapFromContext(
      this.processContext(this.context),
      this.container.nativeElement
    )
    if (this._resolvedExtentChange) {
      this._resolvedExtentChange.emit(this.calculateCurrentMapExtent())
    }

    this.setupDisplayMessageObservable()
    this.olMapResolver(this.olMap)
  }

  async ngOnChanges(changes: SimpleChanges) {
    if ('context' in changes && !changes['context'].isFirstChange()) {
      const diff = computeMapContextDiff(
        this.processContext(changes['context'].currentValue),
        this.processContext(changes['context'].previousValue)
      )
      await applyContextDiffToMap(this.olMap, diff)

      if (this._resolvedExtentChange && diff.viewChanges) {
        this._resolvedExtentChange.emit(this.calculateCurrentMapExtent())
      }
    }
  }

  private setupEventListener(
    eventType: keyof MapEventsByType,
    handler: (event: MapEventsByType[typeof eventType]) => void
  ) {
    this.openlayersMap.then((olMap: OlMap) => {
      listen(olMap, eventType, handler)
    })
  }

  private setupDisplayMessageObservable() {
    this.displayMessage$ = merge(
      fromEvent(this.olMap, 'mapmuted').pipe(map(() => true)),
      fromEvent(this.olMap, 'movestart').pipe(map(() => false)),
      fromEvent(this.olMap, 'singleclick').pipe(map(() => false))
    ).pipe(
      switchMap((muted) =>
        muted
          ? timer(2000).pipe(
              map(() => false),
              startWith(true),
              delay(400)
            )
          : of(false)
      ),
      takeUntilDestroyed(this.destroyRef)
    )
  }

  private processContext(context: MapContext): MapContext {
    const processed = context
      ? { ...context, view: context.view ?? DEFAULT_VIEW }
      : { layers: [], view: DEFAULT_VIEW }

    // Prepend with default basemap and basemap layers
    if (this.basemapLayers.length) {
      processed.layers = [...this.basemapLayers, ...processed.layers]
    }
    if (!this.doNotUseDefaultBasemap) {
      processed.layers = [DEFAULT_BASEMAP_LAYER, ...processed.layers]
    }

    // Apply view constraints
    if (this.mapViewConstraints.maxZoom) {
      processed.view = {
        maxZoom: this.mapViewConstraints.maxZoom,
        ...processed.view,
      }
    }
    if (this.mapViewConstraints.maxExtent) {
      processed.view = {
        maxExtent: this.mapViewConstraints.maxExtent,
        ...processed.view,
      }
    }

    if (
      processed.view &&
      'zoom' in processed.view &&
      'center' in processed.view
    ) {
      return processed
    }

    if (processed.view && 'extent' in processed.view) {
      return processed
    }

    // Ensure valid view
    if (this.mapViewConstraints.maxExtent) {
      processed.view = {
        extent: this.mapViewConstraints.maxExtent,
        ...processed.view,
      }
    } else {
      processed.view = { ...DEFAULT_VIEW, ...processed.view }
    }

    return processed
  }
}
