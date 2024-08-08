import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { catchError, from, map, Observable, of, switchMap } from 'rxjs'
import {
  DEFAULT_BASELAYER_CONTEXT,
  FeatureMapModule,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapFacade,
  MapStyleService,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import { Fill, Stroke, Style } from 'ol/style'
import { getOptionalMapConfig, MapConfig } from '@geonetwork-ui/util/app-config'
import { Geometry } from 'geojson'
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
import { DatasetSpatialExtent } from '@geonetwork-ui/common/domain/model/record'
import { Polygon } from 'ol/geom'
import GeoJSON from 'ol/format/GeoJSON'

@Component({
  selector: 'gn-ui-form-field-map-container',
  standalone: true,
  imports: [CommonModule, FeatureMapModule],
  templateUrl: './form-field-map-container.component.html',
  styleUrls: ['./form-field-map-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldMapContainerComponent implements OnChanges {
  @Input() spatialExtents: DatasetSpatialExtent[]

  error = ''
  mapContext$: Observable<MapContextModel> = this.mapFacade.layers$.pipe(
    switchMap((layers) =>
      from(this.mapUtils.getLayerExtent(layers[0])).pipe(
        catchError(() => {
          this.error = 'The layer has no extent'
          return of(undefined)
        }),
        map((extent) => {
          return {
            layers: [DEFAULT_BASELAYER_CONTEXT, ...layers],
            view: {
              extent: extent,
            },
          } as MapContextModel
        })
      )
    )
  )

  mapConfig: MapConfig = getOptionalMapConfig()

  constructor(
    private mapFacade: MapFacade,
    private mapUtils: MapUtilsService,
    private styleService: MapStyleService
  ) {
    const fill = new Fill({
      color: 'transparent',
    })
    const stroke = new Stroke({
      color: 'black',
      width: 2,
    })
    const styles = [
      new Style({
        fill: fill,
        stroke: stroke,
      }),
    ]
    this.styleService.styles.default = this.styleService.createStyleFunction({
      ...this.styleService.createGeometryStyles({ color: 'black' }),
      polygon: styles,
    })
  }

  ngOnChanges(): void {
    this.mapFacade.removeLayer(0)

    if (this.spatialExtents) {
      const featureCollection: GeoJSONFeatureCollection = {
        type: 'FeatureCollection',
        features: [],
      }

      this.spatialExtents.forEach((extent) => {
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
      this.mapFacade.addLayer({
        type: MapContextLayerTypeEnum.GEOJSON,
        data: featureCollection,
        title: 'Spatial extents',
      })
    }
  }
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

    const geoJSONGeom = new GeoJSON().writeGeometryObject(geometry)
    return geoJSONGeom
  }
}
