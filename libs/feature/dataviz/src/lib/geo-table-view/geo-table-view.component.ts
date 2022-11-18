import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  Optional,
  ViewChild,
} from '@angular/core'
import {
  FEATURE_MAP_OPTIONS,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapOptionsModel,
  MapStyleService,
} from '@geonetwork-ui/feature/map'
import {
  TableComponent,
  TableItemId,
  TableItemModel,
} from '@geonetwork-ui/ui/layout'
import type { FeatureCollection } from 'geojson'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import { BehaviorSubject } from 'rxjs'
import { MapContextComponent } from '@geonetwork-ui/feature/map'
import { map } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-geo-table-view',
  templateUrl: './geo-table-view.component.html',
  styleUrls: ['./geo-table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoTableViewComponent {
  @Input() set data(value: FeatureCollection) {
    this.data$.next(value)
  }
  @ViewChild(TableComponent) uiTable: TableComponent
  @ViewChild(MapContextComponent) mapComponent: MapContextComponent

  tableData: TableItemModel[]
  selectionId: TableItemId
  selection: Feature<Geometry>

  data$ = new BehaviorSubject<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  })
  context$ = this.data$.pipe(
    map(
      (data) =>
        ({
          view: {
            center: [3, 43],
            zoom: 3,
          },
          layers: [
            {
              type: MapContextLayerTypeEnum.GEOJSON,
              data,
              style: this.styleFn.bind(this),
            },
          ],
        } as MapContextModel)
    )
  )
  tableData$ = this.data$.pipe(
    map((data) =>
      data.features.map((f) => ({
        id: f.id,
        ...f.properties,
      }))
    )
  )

  get dataLayer(): VectorLayer<VectorSource> {
    return this.mapComponent?.layers[0]
  }
  get dataSource() {
    return this.dataLayer?.getSource()
  }

  constructor(
    private changeRef: ChangeDetectorRef,
    private styleService: MapStyleService,
    @Optional() @Inject(FEATURE_MAP_OPTIONS) private mapOptions: MapOptionsModel
  ) {}

  onTableSelect(tableEntry: TableItemModel) {
    const { id } = tableEntry
    this.selectionId = id
    this.selection = this.getFeatureFromId(id)
    if (this.selection) {
      this.animateToFeature(this.selection)
    }
  }

  onMapFeatureSelect(features: Feature<Geometry>[]): void {
    this.selection = features?.length > 0 && features[0]
    if (this.selection) {
      this.selectionId = this.selection.getId()
      this.changeRef.detectChanges()
      this.dataLayer.changed()
      this.uiTable.scrollToItem(this.selectionId)
    }
  }

  private animateToFeature(feature: Feature<Geometry>): void {
    this.mapComponent.view.fit(feature.getGeometry().getExtent(), {
      duration: 1000,
      maxZoom: 11,
    })
  }

  private getFeatureFromId(id: TableItemId) {
    return this.dataSource
      .getFeatures()
      .find((feature) => feature.getId() === id)
  }

  private styleFn(
    feature: Feature<Geometry>,
    resolution: number
  ): void | Style | Style[] {
    const isSelected =
      this.selectionId !== undefined && this.selectionId === feature.getId()
    const styleFn = isSelected
      ? this.styleService.styles.defaultHL
      : this.styleService.styles.default
    return styleFn(feature, resolution)
  }
}
