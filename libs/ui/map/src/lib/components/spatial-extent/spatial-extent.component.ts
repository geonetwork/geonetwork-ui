import { ChangeDetectorRef, Component, inject, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Geometry } from 'geojson'
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import { Polygon } from 'ol/geom.js'
import {
  createViewFromLayer,
  MapContext,
  MapContextLayer,
} from '@geospatial-sdk/core'
import { MapContainerComponent } from '../map-container/map-container.component'
import { BehaviorSubject, from, Observable, of } from 'rxjs'
import { map, switchMap, tap } from 'rxjs/operators'
import { DatasetSpatialExtent } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-spatial-extent',
  standalone: true,
  imports: [CommonModule, MapContainerComponent],
  templateUrl: './spatial-extent.component.html',
  styleUrl: './spatial-extent.component.css',
})
export class SpatialExtentComponent {
  private _cdr = inject(ChangeDetectorRef)

  @Input() set spatialExtents(value: DatasetSpatialExtent[]) {
    this.spatialExtents$.next(value)
  }
  spatialExtents$ = new BehaviorSubject<DatasetSpatialExtent[]>([])
  mapContext$: Observable<MapContext> = this.spatialExtents$.pipe(
    switchMap((extents) => {
      if (extents.length === 0) {
        return of(null)
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
          'fill-color': 'rgba(153, 153, 153, 0.3)',
        },
      }
      return from(createViewFromLayer(layer)).pipe(
        map((view) => ({ view, layers: [layer] }) as MapContext),
        tap(() => this._cdr.markForCheck())
      )
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
