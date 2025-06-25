import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { fromEvent, merge, Observable, of, timer } from 'rxjs'
import { delay, map, startWith, switchMap } from 'rxjs/operators'
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
  MapContext,
  MapContextLayer,
  MapContextLayerXyz,
  MapContextView,
  SourceLoadErrorEvent,
  SourceLoadErrorType,
} from '@geospatial-sdk/core'
import {
  applyContextDiffToMap,
  createMapFromContext,
  listen,
} from '@geospatial-sdk/openlayers'
import type OlMap from 'ol/Map'
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
  @Input() context: MapContext | null

  // these events only get registered on the map if they are used
  _featuresClick: EventEmitter<Feature[]>
  @Output() get featuresClick() {
    if (!this._featuresClick) {
      this.openlayersMap.then((olMap) => {
        listen(
          olMap,
          FeaturesClickEventType,
          ({ features }: FeaturesClickEvent) =>
            this._featuresClick.emit(features)
        )
      })
      this._featuresClick = new EventEmitter<Feature[]>()
    }
    return this._featuresClick
  }
  _featuresHover: EventEmitter<Feature[]>
  @Output() get featuresHover() {
    if (!this._featuresHover) {
      this.openlayersMap.then((olMap) => {
        listen(
          olMap,
          FeaturesHoverEventType,
          ({ features }: FeaturesHoverEvent) =>
            this._featuresHover.emit(features)
        )
      })
      this._featuresHover = new EventEmitter<Feature[]>()
    }
    return this._featuresHover
  }
  _mapClick: EventEmitter<[number, number]>
  @Output() get mapClick() {
    if (!this._mapClick) {
      this.openlayersMap.then((olMap) => {
        listen(olMap, MapClickEventType, ({ coordinate }: MapClickEvent) =>
          this._mapClick.emit(coordinate)
        )
      })
      this._mapClick = new EventEmitter<[number, number]>()
    }
    return this._mapClick
  }
  _sourceLoadError: EventEmitter<SourceLoadErrorEvent>
  @Output() get sourceLoadError() {
    if (!this._sourceLoadError) {
      this.openlayersMap.then((olMap) => {
        listen(olMap, SourceLoadErrorType, (error: SourceLoadErrorEvent) =>
          this._sourceLoadError.emit(error)
        )
      })
      this._sourceLoadError = new EventEmitter<SourceLoadErrorEvent>()
    }
    return this._sourceLoadError
  }

  @ViewChild('map') container: ElementRef
  displayMessage$: Observable<boolean>
  olMap: OlMap

  constructor(
    @Inject(DO_NOT_USE_DEFAULT_BASEMAP) private doNotUseDefaultBasemap: boolean,
    @Inject(BASEMAP_LAYERS) private basemapLayers: MapContextLayer[],
    @Inject(MAP_VIEW_CONSTRAINTS)
    private mapViewConstraints: {
      maxZoom?: number
      maxExtent?: Extent
    }
  ) {}

  private olMapResolver
  openlayersMap = new Promise<OlMap>((resolve) => {
    this.olMapResolver = resolve
  })

  async ngAfterViewInit() {
    this.olMap = await createMapFromContext(
      this.processContext(this.context),
      this.container.nativeElement
    )
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
      )
    )
    this.olMapResolver(this.olMap)
  }

  async ngOnChanges(changes: SimpleChanges) {
    if ('context' in changes && !changes['context'].isFirstChange()) {
      const diff = computeMapContextDiff(
        this.processContext(changes['context'].currentValue),
        this.processContext(changes['context'].previousValue)
      )
      await applyContextDiffToMap(this.olMap, diff)
    }
  }

  // This will apply basemap layers & view constraints
  processContext(context: MapContext): MapContext {
    const processed = context
      ? { ...context, view: context.view ?? DEFAULT_VIEW }
      : { layers: [], view: DEFAULT_VIEW }
    if (this.basemapLayers.length) {
      processed.layers = [...this.basemapLayers, ...processed.layers]
    }
    if (!this.doNotUseDefaultBasemap) {
      processed.layers = [DEFAULT_BASEMAP_LAYER, ...processed.layers]
    }
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
      !('zoom' in processed.view) &&
      !('center' in processed.view)
    ) {
      if (this.mapViewConstraints.maxExtent) {
        processed.view = {
          extent: this.mapViewConstraints.maxExtent,
          ...processed.view,
        }
      } else {
        processed.view = { ...DEFAULT_VIEW, ...processed.view }
      }
    }
    return processed
  }
}
