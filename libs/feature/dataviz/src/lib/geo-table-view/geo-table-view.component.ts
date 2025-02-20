import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  TableScrollComponent,
  TableItemId,
  TableItemModel,
} from '@geonetwork-ui/ui/dataviz'
import type { Feature, FeatureCollection } from 'geojson'
import { Subscription } from 'rxjs'
import { MapContext } from '@geospatial-sdk/core'
import {
  FeatureDetailComponent,
  MapContainerComponent,
} from '@geonetwork-ui/ui/map'

@Component({
  selector: 'gn-ui-geo-table-view',
  templateUrl: './geo-table-view.component.html',
  styleUrls: ['./geo-table-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TableScrollComponent,
    MapContainerComponent,
    FeatureDetailComponent,
  ],
  standalone: true,
})
export class GeoTableViewComponent implements OnInit, OnDestroy {
  @Input() data: FeatureCollection = { type: 'FeatureCollection', features: [] }
  @ViewChild('table') uiTable: TableScrollComponent
  @ViewChild('mapContainer') mapContainer: MapContainerComponent

  tableData: TableItemModel[]
  mapContext: MapContext
  selectionId: TableItemId
  selection: Feature
  private subscription = new Subscription()

  get features() {
    return this.data.features
  }

  constructor(private changeRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tableData = this.geojsonToTableData(this.data)
    this.mapContext = this.initMapContext()
  }

  onTableSelect(tableEntry: TableItemModel) {
    const { id } = tableEntry
    this.selectionId = id
    this.selection = this.getFeatureFromId(id)
    if (this.selection) {
      this.animateToFeature(this.selection)
    }
  }

  onMapFeatureSelect(features: Feature[]): void {
    this.selection = features?.length > 0 && features[0]
    if (this.selection) {
      // FIXME: show styling for selection
      this.selectionId = this.selection.id
      this.changeRef.detectChanges()
      // this.vectorLayer.changed()
      this.uiTable.scrollToItem(this.selectionId)
    }
  }

  private geojsonToTableData(geojson: FeatureCollection) {
    return geojson.features.map((f) => ({
      id: f.id,
      ...f.properties,
    }))
  }

  private initMapContext(): MapContext {
    return {
      layers: [
        {
          type: 'xyz',
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        },
        {
          type: 'geojson',
          data: this.data,
        },
      ],
      view: {
        center: [0, 0],
        zoom: 2,
      },
    }
  }

  private animateToFeature(feature: Feature): void {
    this.mapContext = {
      ...this.mapContext,
      view: {
        geometry: feature.geometry,
        maxZoom: 13,
      },
    }
    // FIXME: animate the view
    // this.view.fit(feature.getGeometry().getExtent(), {
    //   duration: 1000,
    //   maxZoom: 11,
    // })
  }

  private getFeatureFromId(id: TableItemId) {
    return this.features.find((feature) => feature.id === id)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
