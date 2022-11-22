import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core'
import {
  MapContextLayerModel,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapStyleService,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import { getMapConfig, MapConfig } from '@geonetwork-ui/util/app-config'
import {
  getLinkLabel,
  MetadataLink,
  MetadataLinkType,
  ProxyService,
} from '@geonetwork-ui/util/shared'
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
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators'
import { DataService } from '../service/data.service'
import { MdViewFacade } from '../state/mdview.facade'

@Component({
  selector: 'gn-ui-data-view-map',
  templateUrl: './data-view-map.component.html',
  styleUrls: ['./data-view-map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewMapComponent implements OnInit {
  mapConfig: MapConfig = getMapConfig()
  selection: Feature
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
          return of([])
        }),
        finalize(() => (this.loading = false))
      )
    })
  )

  mapContext$: Observable<MapContextModel> = this.currentLayers$.pipe(
    switchMap((layers) =>
      this.mapUtils.getLayerExtent(layers[0]).pipe(
        catchError((error) => {
          console.warn(error) // FIXME: report this to the user somehow
          return of(undefined)
        }),
        map((extent) => ({
          layers,
          view: {
            extent,
          },
        })),
        tap(() => this.resetSelection())
      )
    ),
    startWith({
      layers: [],
    })
  )

  constructor(
    private mdViewFacade: MdViewFacade,
    private mapUtils: MapUtilsService,
    private dataService: DataService,
    private proxy: ProxyService,
    private changeRef: ChangeDetectorRef,
    private styleService: MapStyleService
  ) {}

  ngOnInit(): void {
    this.selectionStyle = this.styleService.styles.defaultHL
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

  getLayerFromLink(link: MetadataLink): Observable<MapContextLayerModel> {
    if (link.type === MetadataLinkType.WMS) {
      return of({
        url: link.url,
        type: MapContextLayerTypeEnum.WMS,
        name: link.name,
      })
    } else if (link.type === MetadataLinkType.WMTS) {
      return this.mapUtils.getWmtsOptionsFromCapabilities(link).pipe(
        map(
          (options) =>
            ({
              type: MapContextLayerTypeEnum.WMTS,
              options: options,
            } as any)
        )
      )
    } else if (link.type === MetadataLinkType.WFS) {
      return this.dataService
        .getGeoJsonDownloadUrlFromWfs(link.url, link.name)
        .pipe(
          switchMap((url) => this.dataService.readGeoJsonDataset(url)),
          map((data) => ({
            type: MapContextLayerTypeEnum.GEOJSON,
            data,
            style: this.styleService.styles.default as any, // FIXME: fix typing
          }))
        )
    } else if (link.type === MetadataLinkType.DOWNLOAD) {
      return this.dataService.readGeoJsonDataset(link.url).pipe(
        map((data) => ({
          type: MapContextLayerTypeEnum.GEOJSON,
          data,
          style: this.styleService.styles.default as any, // FIXME: fix typing
        }))
      )
    } else if (link.type === MetadataLinkType.ESRI_REST) {
      const url = this.dataService.getGeoJsonDownloadUrlFromEsriRest(link.url)
      return this.dataService.readGeoJsonDataset(url).pipe(
        map((data) => ({
          type: MapContextLayerTypeEnum.GEOJSON,
          data,
        }))
      )
    }
    return throwError('protocol not supported')
  }

  selectLinkToDisplay(link: number) {
    this.selectedLinkIndex$.next(link)
  }
}
