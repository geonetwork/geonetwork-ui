import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  FEATURE_MAP_OPTIONS,
  FeatureInfoService,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapManagerService,
  MapOptionsModel,
} from '@geonetwork-ui/feature/map'
import {
  TableComponent,
  TableItemId,
  TableItemModel,
} from '@geonetwork-ui/ui/dataviz'
import type { FeatureCollection } from 'geojson'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import { Geometry } from 'ol/geom'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Style from 'ol/style/Style'
import { Subscription } from 'rxjs'

@Component({
  selector: 'gn-ui-geo-table-view',
  templateUrl: './geo-table-view.component.html',
  styleUrls: ['./geo-table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeoTableViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data: FeatureCollection = { type: 'FeatureCollection', features: [] }
  @ViewChild(TableComponent) uiTable: TableComponent

  private map: Map
  private view: View
  private vectorLayer: VectorLayer<VectorSource<Geometry>>
  private vectorSource: VectorSource<Geometry>
  private features: Feature<Geometry>[]

  tableData: TableItemModel[]
  mapContext: MapContextModel
  selectionId: TableItemId
  selection: Feature<Geometry>
  private subscription = new Subscription()

  constructor(
    private manager: MapManagerService,
    private featureInfo: FeatureInfoService,
    private changeRef: ChangeDetectorRef,
    @Inject(FEATURE_MAP_OPTIONS) private mapOptions: MapOptionsModel
  ) {}

  ngOnInit(): void {
    this.tableData = this.geojsonToTableData(this.data)
    this.mapContext = this.initMapContext()
    this.featureInfo.handleFeatureInfo()
    this.subscription.add(
      this.featureInfo.features$.subscribe((features) => {
        this.onMapFeatureSelect(features)
      })
    )
  }

  ngAfterViewInit(): void {
    const map = (this.map = this.manager.map)
    this.view = map.getView()
    this.vectorLayer = this.manager.map.getLayers().item(1) as VectorLayer<
      VectorSource<Geometry>
    >
    this.vectorLayer.setStyle(this.styleFn.bind(this))
    this.vectorSource = this.vectorLayer.getSource()
    this.features = this.vectorSource.getFeatures()
    this.view.fit(this.vectorSource.getExtent())
  }

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
      this.vectorLayer.changed()
      this.uiTable.scrollToItem(this.selectionId)
    }
  }

  private geojsonToTableData(geojson: FeatureCollection) {
    return geojson.features.map((f) => ({
      id: f.id,
      ...f.properties,
    }))
  }

  private initMapContext(): MapContextModel {
    return {
      layers: [
        {
          type: MapContextLayerTypeEnum.XYZ,
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
        {
          type: MapContextLayerTypeEnum.GEOJSON,
          data: this.data,
        },
      ],
    }
  }

  private animateToFeature(feature: Feature<Geometry>): void {
    this.view.fit(feature.getGeometry().getExtent(), {
      duration: 1000,
      maxZoom: 11,
    })
  }

  private getFeatureFromId(id: TableItemId) {
    return this.features.find((feature) => feature.getId() === id)
  }

  private styleFn(
    feature: Feature<Geometry>,
    resolution: number
  ): void | Style | Style[] {
    if (
      this.selectionId !== undefined &&
      this.selectionId === feature.getId()
    ) {
      return this.mapOptions.hlStyle(feature, resolution)
    } else {
      return this.mapOptions.defaultStyle(feature, resolution)
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
