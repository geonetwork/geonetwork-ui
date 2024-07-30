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
import Feature from 'ol/Feature'

import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
import GeoJSON from 'ol/format/GeoJSON'
import { Polygon } from 'ol/geom'
import { Fill, Stroke, Style } from 'ol/style'
import { catchError, from, map, Observable, of, switchMap } from 'rxjs'
import { GenericFormFieldKeywordsComponent } from '../form-field-keywords-generic/form-field-keywords-generic.component'

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
    private platformService: PlatformServiceInterface,
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
    this.placeKeywords.forEach((keyword) => {
      const bbox = this.spatialExtents.find(
        (extent) => extent.description === keyword?.key
      )?.bbox

      const geometries = this.spatialExtents.find(
        (extent) => extent.description === keyword?.key
      )?.geometries

      this.keywordsLinkedToExtents[keyword.key] = {
        placeKeyword: keyword,
        spatialExtents: {
          bbox: bbox,
          geometries: geometries,
          description: keyword.label,
        },
      }
    })

    this.spatialExtents.forEach((extent) => {
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
    // add initial keywords to badges
    const missingPlaces = Object.keys(this.keywordsLinkedToExtents).filter(
      (key) => !this.placeKeywords.some(({ key: id }) => key === id)
    )
    console.log('missingPlaces', missingPlaces)

    missingPlaces.forEach((missingPlace) => {
      this.placeKeywords.push(
        this.keywordsLinkedToExtents[missingPlace].placeKeyword
      )
    })

    // add initial places to map
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

    // 1. itereate over keywordsLinkedToExtents
    // 2. add keywords.key to list of displayed place keywords
    // apply Rules -> check if description is undefined or URI -> "Unknown location" badge
    // 3. check if geometry is available for keyword
    // 4. if yes, add to map
    // 5. if no, check if bbox is available
    // 6. if yes, add to map
    // 7. if no, do nothing?

    // Questions:
    // I will manage keywordsLinkedToExtents (adding / removing keywords and geoms)
    // When will I emit updated values? add/remove
    // Will I update the keywordsLinkedToExtents and then emit the values?
    // Should keywordsLinkedToExtents be an Observable that should be listened to and then emit the values as Output?

    // Rules
    //when creating an extent from a place keyword, the keyword URI should be stored in the extent description; this way, when deleting a place keyword, its corresponding extent can also be removed from the record
    // if an extent comes with a description that is a URI for which no keyword was found, a badge “Unknown location” appears below the keyword selector; this way, the extent can still be deleted
    // if an extent comes with no description: same, an “Unknown location” badge appears
    // if an extent comes with a description that is NOT a URI, the description is shown in the badge
  }

  bboxCoordsToGeometry(bbox: [number, number, number, number]): Feature {
    const geometry = new Polygon([
      [
        [bbox[2], bbox[3]],
        [bbox[2], bbox[1]],
        [bbox[0], bbox[1]],
        [bbox[0], bbox[3]],
        [bbox[2], bbox[3]],
      ],
    ])
    return new Feature(geometry)
  }

  addToMap(key: string, geometry: Feature) {
    const featureCollection: GeoJSONFeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }
    const geoJSONGeom = new GeoJSON().writeGeometryObject(
      geometry.getGeometry()
    )

    featureCollection.features.push({
      type: 'Feature',
      properties: { description: key },
      geometry: geoJSONGeom,
    })

    console.log('geoJSONGeom', geoJSONGeom)

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
    // this.placeKeywords = keywords
    console.log('placeKeywords', keywords)
  }
}
