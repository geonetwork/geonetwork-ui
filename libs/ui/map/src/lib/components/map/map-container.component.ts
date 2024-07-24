import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { fromEvent, merge, Observable, of, timer } from 'rxjs'
import { delay, map, startWith, switchMap } from 'rxjs/operators'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import {
  computeMapContextDiff,
  Extent,
  MapContext,
  MapContextLayer,
  MapContextLayerXyz,
  MapContextView,
} from '@geospatial-sdk/core'
import OlMap from 'ol/Map'
import {
  applyContextDiffToMap,
  createMapFromContext,
} from '@geospatial-sdk/openlayers'
import Feature from 'ol/Feature'

export const DO_NOT_USE_DEFAULT_BASEMAP = new InjectionToken(
  'doNotUseDefaultBasemap',
  { factory: () => false }
)
export const BASEMAP_LAYERS = new InjectionToken<MapContextLayer[]>(
  'basemapLayers',
  { factory: () => [] }
)
export const MAP_VIEW_CONSTRAINTS = new InjectionToken<{
  maxZoom?: number
  maxExtent?: Extent
}>('mapViewConstraints', {
  factory: () => ({}),
})

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
  imports: [CommonModule, MatIconModule, TranslateModule],
})
export class MapContainerComponent implements AfterViewInit, OnChanges {
  @Input() context: MapContext
  @Output() featuresClicked = new EventEmitter<Feature[]>() // TODO

  @ViewChild('map') container: ElementRef
  displayMessage$: Observable<boolean>
  olMap: OlMap

  constructor(
    @Inject(DO_NOT_USE_DEFAULT_BASEMAP) private disableBaseMap: boolean,
    @Inject(BASEMAP_LAYERS) private basemapLayers: MapContextLayer[],
    @Inject(MAP_VIEW_CONSTRAINTS)
    private mapViewConstraints: {
      maxZoom?: number
      maxExtent?: Extent
    }
  ) {}

  public get openlayersMap(): OlMap {
    return this.olMap
  }

  ngAfterViewInit() {
    this.olMap = createMapFromContext(
      this.context,
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
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('context' in changes && !changes['context'].isFirstChange()) {
      const diff = computeMapContextDiff(
        this.processContext(changes['context'].currentValue),
        this.processContext(changes['context'].previousValue)
      )
      applyContextDiffToMap(this.olMap, diff)
    }
  }

  // This will apply basemap layers & view constraints
  processContext(context: MapContext): MapContext {
    const processed = { ...context }
    if (this.basemapLayers.length) {
      processed.layers = [...this.basemapLayers, ...processed.layers]
    }
    if (!this.disableBaseMap) {
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
    if (!('zoom' in processed.view) && !('center' in processed.view)) {
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
