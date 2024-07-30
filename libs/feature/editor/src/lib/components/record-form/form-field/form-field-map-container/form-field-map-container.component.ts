import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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
import { Extent } from 'ol/extent'
import { Fill, Stroke, Style } from 'ol/style'
import { getOptionalMapConfig, MapConfig } from '@geonetwork-ui/util/app-config'
import { Geometry } from 'geojson'
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
import {
  DatasetSpatialExtent,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'
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
export class FormFieldMapContainerComponent implements OnInit {
  @Input() keywordsWithSpatialExtents: {
    [key: string]: {
      placeKeyword?: Keyword
      spatialExtents?: DatasetSpatialExtent
    }
  }[]

  error = ''
  viewExtent: Extent
  mapContext$: Observable<MapContextModel> = this.mapFacade.layers$.pipe(
    switchMap((layers) =>
      from(this.mapUtils.getLayerExtent(layers[layers.length - 1])).pipe(
        catchError(() => {
          this.error = 'The layer has no extent'
          return of(undefined)
        }),
        map((extent) => {
          this.viewExtent = this.mapUtils.getGeoJSONLayersExtent([
            this.viewExtent,
            extent,
          ])

          return {
            layers: [DEFAULT_BASELAYER_CONTEXT, ...layers],
            view: {
              extent: this.viewExtent,
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

  ngOnInit(): void {
    Object.keys(this.keywordsWithSpatialExtents).forEach((key) => {
      if (
        this.keywordsWithSpatialExtents[key].spatialExtents?.geometries
          ?.length >= 0
      ) {
        this.keywordsWithSpatialExtents[key].spatialExtents.geometries.forEach(
          (geoemtry) => this.addToMap(key, geoemtry)
        )
      } else if (
        this.keywordsWithSpatialExtents[key].spatialExtents?.bbox?.length >= 0
      ) {
        this.addToMap(
          key,
          this.bboxCoordsToGeometry(
            this.keywordsWithSpatialExtents[key].spatialExtents.bbox
          )
        )
      }
    })
  }

  bboxCoordsToGeometry(bbox: [number, number, number, number]): Geometry {
    const geometry = new Polygon([
      [
        [bbox[2], bbox[3]],
        [bbox[2], bbox[1]],
        [bbox[0], bbox[1]],
        [bbox[0], bbox[3]],
        [bbox[2], bbox[3]],
      ],
    ])

    const geoJSONGeom = new GeoJSON().writeGeometryObject(geometry)
    return geoJSONGeom
  }

  addToMap(key: string, geometry: Geometry) {
    const featureCollection: GeoJSONFeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }

    featureCollection.features.push({
      type: 'Feature',
      properties: { description: key },
      geometry: geometry,
    })

    this.mapFacade.addLayer({
      type: MapContextLayerTypeEnum.GEOJSON,
      data: featureCollection,
      title: key,
    })
  }

  deleteLayer(index: number) {
    this.mapFacade.removeLayer(index)
  }
}
