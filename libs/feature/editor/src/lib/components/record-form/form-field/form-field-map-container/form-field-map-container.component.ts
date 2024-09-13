import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Geometry } from 'geojson'
import GeoJSON, { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
import { DatasetSpatialExtent } from '@geonetwork-ui/common/domain/model/record'
import { Polygon } from 'ol/geom'
import {
  createViewFromLayer,
  MapContext,
  MapContextLayer,
} from '@geospatial-sdk/core'
import { MapContainerComponent } from '@geonetwork-ui/ui/map'
import { BehaviorSubject, Observable } from 'rxjs'
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'gn-ui-form-field-map-container',
  standalone: true,
  imports: [CommonModule, MapContainerComponent],
  templateUrl: './form-field-map-container.component.html',
  styleUrls: ['./form-field-map-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldMapContainerComponent {
  @Input() set spatialExtents(value: DatasetSpatialExtent[]) {
    this.spatialExtents$.next(value)
  }
  spatialExtents$ = new BehaviorSubject<DatasetSpatialExtent[]>([])
  mapContext$: Observable<MapContext> = this.spatialExtents$.pipe(
    switchMap(async (extents) => {
      if (extents.length === 0) {
        return null // null extent means default view
      }
      const featureCollection: GeoJSONFeatureCollection = {
        type: 'FeatureCollection',
        features: [],
      }
      extents.forEach((extent) => {
        if (extent.geometry) {
          featureCollection.features.push({
            type: 'Feature',
            properties: {},
            geometry: extent.geometry,
          })
        } else if (extent.bbox?.length >= 0) {
          featureCollection.features.push({
            type: 'Feature',
            properties: {},
            geometry: this.bboxCoordsToGeometry(extent.bbox),
          })
        }
      })

      const layer: MapContextLayer = {
        type: 'geojson',
        data: featureCollection,
        label: 'Spatial extents',
        style: {
          'stroke-color': 'black',
          'stroke-width': 2,
        },
      }
      const view = await createViewFromLayer(layer)
      return {
        view,
        layers: [layer],
      }
    })
  )

  error = ''

  bboxCoordsToGeometry(bbox: [number, number, number, number]): Geometry {
    const geometry = new Polygon([
      [
        [bbox[0], bbox[1]],
        [bbox[0], bbox[3]],
        [bbox[2], bbox[3]],
        [bbox[2], bbox[1]],
        [bbox[0], bbox[1]],
      ],
    ])

    return new GeoJSON().writeGeometryObject(geometry)
  }
}
