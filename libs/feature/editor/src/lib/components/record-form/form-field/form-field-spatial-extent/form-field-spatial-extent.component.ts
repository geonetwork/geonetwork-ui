import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {
  DatasetSpatialExtent,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  DEFAULT_BASELAYER_CONTEXT,
  FeatureMapModule,
  MapContextLayerTypeEnum,
  MapContextModel,
  MapFacade,
  MapStyleService,
  MapUtilsService,
} from '@geonetwork-ui/feature/map'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  SwitchToggleComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { getOptionalMapConfig, MapConfig } from '@geonetwork-ui/util/app-config'
import { Extent } from 'ol/extent'

import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
import GeoJSON from 'ol/format/GeoJSON'
import { Polygon } from 'ol/geom'
import { Fill, Stroke, Style } from 'ol/style'
import { catchError, from, map, Observable, of, switchMap } from 'rxjs'
import { GenericFormFieldKeywordsComponent } from '../form-field-keywords-generic/form-field-keywords-generic.component'
import { Geometry } from 'geojson'

@Component({
  selector: 'gn-ui-form-field-spatial-extent',
  templateUrl: './form-field-spatial-extent.component.html',
  styleUrls: ['./form-field-spatial-extent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DropdownSelectorComponent,
    UiInputsModule,
    CommonModule,
    UiWidgetsModule,
    AutocompleteComponent,
    FeatureMapModule,
    SwitchToggleComponent,
    GenericFormFieldKeywordsComponent,
  ],
})
export class FormFieldSpatialExtentComponent implements OnInit {
  @Input() placeKeywords: Keyword[]
  @Input() spatialExtents: DatasetSpatialExtent[]

  @Output() placeKeywordChange: EventEmitter<Keyword[]> = new EventEmitter()
  @Output() spatialExtentsChange: EventEmitter<DatasetSpatialExtent[]> =
    new EventEmitter()

  keywordsLinkedToExtents = new Array<{
    [key: string]: {
      placeKeyword?: Keyword
      spatialExtents?: DatasetSpatialExtent
    }
  }>()

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
    private styleService: MapStyleService,
    private mapUtils: MapUtilsService
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
    this.linkPlaceKeywordsToSpatialExtents(
      this.placeKeywords,
      this.spatialExtents
    )
    this.linkSpatialExtentsToPlaceKeywords(
      this.spatialExtents,
      this.placeKeywords
    )

    // add initial places to map
    this.handleLayersOnMap()

    // Rules
    //when creating an extent from a place keyword, the keyword URI should be stored in the extent description; this way, when deleting a place keyword, its corresponding extent can also be removed from the record
    // if an extent comes with a description that is a URI for which no keyword was found, a badge “Unknown location” appears below the keyword selector; this way, the extent can still be deleted
    // if an extent comes with no description: same, an “Unknown location” badge appears
    // if an extent comes with a description that is NOT a URI, the description is shown in the badge
  }

  linkPlaceKeywordsToSpatialExtents(
    placeKeywords: Keyword[],
    spatialExtents: DatasetSpatialExtent[]
  ) {
    placeKeywords.forEach((keyword) => {
      const bbox = spatialExtents.find(
        (extent) => extent?.description === keyword?.key
      )?.bbox

      const geometries = spatialExtents.find(
        (extent) => extent?.description === keyword?.key
      )?.geometries

      this.keywordsLinkedToExtents[keyword?.key] = {
        placeKeyword: keyword,
        spatialExtents: {
          bbox: bbox,
          geometries: geometries,
          description: keyword.label,
        },
      }
    })

    this.placeKeywords = placeKeywords
  }

  linkSpatialExtentsToPlaceKeywords(
    spatialExtents: DatasetSpatialExtent[],
    placeKeywords: Keyword[]
  ) {
    spatialExtents.forEach((extent) => {
      if (this.keywordsLinkedToExtents[extent.description]) {
        return
      } else {
        this.keywordsLinkedToExtents[extent.description] = {
          spatialExtents: extent,
          placeKeyword: {
            key: extent.description,
            label: 'Unknown location',
            type: 'place',
          },
        }
      }
    })

    const missingPlaces = Object.keys(this.keywordsLinkedToExtents).filter(
      (key) => !placeKeywords.some(({ key: id }) => key === id)
    )
    console.log('missingPlaces', missingPlaces)

    missingPlaces.forEach((missingPlace) => {
      this.placeKeywords.push(
        this.keywordsLinkedToExtents[missingPlace].placeKeyword
      )
    })
  }

  handleLayersOnMap() {
    Object.keys(this.keywordsLinkedToExtents).forEach((key) => {
      if (
        this.keywordsLinkedToExtents[key].spatialExtents?.geometries?.length >=
        0
      ) {
        this.keywordsLinkedToExtents[key].spatialExtents.geometries.forEach(
          (geoemtry) => this.addToMap(key, geoemtry)
        )
      } else if (
        this.keywordsLinkedToExtents[key].spatialExtents?.bbox?.length >= 0
      ) {
        this.addToMap(
          key,
          this.bboxCoordsToGeometry(
            this.keywordsLinkedToExtents[key].spatialExtents.bbox
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
    // const geoJSONGeom = new GeoJSON().writeGeometryObject(
    //   geometry
    // )

    featureCollection.features.push({
      type: 'Feature',
      properties: { description: key },
      geometry: geometry,
    })

    // console.log('geoJSONGeom', geoJSONGeom)

    this.mapFacade.addLayer({
      type: MapContextLayerTypeEnum.GEOJSON,
      data: featureCollection,
      title: key,
    })
  }

  deleteLayer(index: number) {
    this.mapFacade.removeLayer(index)
  }

  handlePlaceKeywordsChange(keywords: Keyword[]) {
    this.keywordsLinkedToExtents = []
    this.linkPlaceKeywordsToSpatialExtents(keywords, this.spatialExtents)

    // add / remove layers
    this.handleLayersOnMap()
  }
}
