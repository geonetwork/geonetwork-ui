import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { FormControl } from '@angular/forms'
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

type AutocompleteItem = { title: string; value: Keyword }
type GeogrCoords = {
  coordEast: string
  coordNorth: string
  coordSouth: string
  coordWest: string
}
type Coverage = {
  label: string
  value: string
  checked: boolean
}

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
  ],
})
export class FormFieldSpatialExtentComponent implements OnInit {
  @Input() placeKeywords: Keyword[]
  @Input() spatialExtents: DatasetSpatialExtent[]
  // @Input()
  coverage = [
    {
      label: 'national', // translation key
      value: 'national',
      checked: true,
    },
    {
      label: 'regional', // translation key
      value: 'regional',
      checked: false,
    },
  ]

  @Output() placeKeywordChange: EventEmitter<Keyword[]> = new EventEmitter()
  @Output() spatialExtentsChange: EventEmitter<DatasetSpatialExtent[]> =
    new EventEmitter()
  // @Output() coverageChange: EventEmitter<Coverage> = new EventEmitter()

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

          // remove map extent when layer was removed?

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

  displayWithFn = (item: AutocompleteItem) => {
    return `${item.title} (${item.value.thesaurus?.name})`
  }

  autoCompleteAction = (query: string) => {
    return this.platformService.searchKeywords(query, ['place']).pipe(
      map((keywords) =>
        keywords.map((keyword) => {
          return { title: keyword.label, value: keyword }
        })
      )
    )
  }

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
    // create a dummy list of placeKeywords
    this.placeKeywords = [
      {
        key: 'uri1',
        label: 'Berlin',
        thesaurus: {
          id: '1',
          name: 'GEMET',
        },
        type: 'place',
        coords: {
          coordEast: '13.5',
          coordNorth: '52.5',
          coordSouth: '52.5',
          coordWest: '13.5',
        },
      },
      {
        key: 'uri2',
        label: 'Hamburg',
        thesaurus: {
          id: '1',
          name: 'GEMET',
        },
        type: 'place',
        coords: {
          coordEast: '10',
          coordNorth: '53.5',
          coordSouth: '53.5',
          coordWest: '10',
        },
      },
      {
        key: 'uri3',
        label: 'Munich',
        thesaurus: {
          id: '1',
          name: 'GEMET',
        },
        type: 'place',
        coords: {
          coordEast: '11.5',
          coordNorth: '48.5',
          coordSouth: '48.5',
          coordWest: '11.5',
        },
      },
    ]

    // create a dummy list of spatialExtents with one more extent
    this.spatialExtents = [
      {
        description: 'uri1',
        bbox: [13.5, 52.5, 13.5, 52.5],
      },
      {
        description: 'uri2',
        bbox: [10, 53.5, 10, 53.5],
      },
      {
        description: 'uri3',
        bbox: [11.5, 48.5, 11.5, 48.5],
      },
      {
        description: 'Paris',
        bbox: [1, 2, 3, 4],
      },
    ]

    this.placeKeywords.forEach((keyword) => {
      const bbox = this.spatialExtents.find(
        (extent) => extent.description === keyword?.key
      )?.bbox
      // Fallback keyword bbox?
      const keywordBox = keyword.coords

      const geometries = this.spatialExtents.find(
        (extent) => extent.description === keyword?.key
      )?.geometries
      // Apply rules

      this.keywordsLinkedToExtents[keyword.key] = {
        placeKeyword: keyword,
        spatialExtents: {
          bbox: bbox,
          geometries: geometries,
          description: keyword.label,
        },
      }
    })
    // loop over spatialExtents

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

    Object.keys(this.keywordsLinkedToExtents).forEach((key) => {
      if (
        this.keywordsLinkedToExtents[key].spatialExtents?.geometries?.length >=
        0
      ) {
        this.keywordsLinkedToExtents[key].spatialExtents.geometries.forEach(
          (geoemtry) => this.addToMap(key, geoemtry)
        )
      } else if (
        this.keywordsLinkedToExtents[key].spatialExtents?.bbox.length >= 0
      ) {
        this.addToMap(
          key,
          this.bboxCoordsToGeometry(
            this.keywordsLinkedToExtents[key].spatialExtents.bbox
          )
        )
      }
    })

    console.log('keywordsLinkedToExtents', this.keywordsLinkedToExtents)
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

  handleItemSelection(item: AutocompleteItem) {
    this.addKeyword(item.value)
    this.addGeogrExtent(item.value.label, item.value.coords)
  }
  handleCoverageSelection(coverage: Coverage) {
    console.log('coverage', coverage)
    // this.coverageChange.emit(coverage)
  }

  addKeyword(keyword: Keyword) {
    if (this.keywordsLinkedToExtents[keyword.key]) {
      return
    } else {
      const keywordBbox = [
        keyword.coords.coordWest,
        keyword.coords.coordSouth,
        keyword.coords.coordEast,
        keyword.coords.coordNorth,
      ].map((coord) => parseFloat(coord)) as [number, number, number, number]
      this.keywordsLinkedToExtents[keyword.key] = {
        placeKeyword: keyword,
        spatialExtents: {
          bbox: keywordBbox,
          description: keyword.label,
        },
      }

      // add to placeKeywords
      this.placeKeywords.push(keyword)
      this.placeKeywordChange.emit(this.placeKeywords)

      // add to spatialExtents
      this.spatialExtents.push({
        description: keyword.key,
        bbox: keywordBbox,
      })
      this.spatialExtentsChange.emit(this.spatialExtents)

      // add to map
    }
  }

  removeKeyword(key: string) {
    delete this.keywordsLinkedToExtents[key]

    this.placeKeywords = this.placeKeywords.filter(
      (keyword) => keyword.key !== key
    )
    this.placeKeywordChange.emit(this.placeKeywords)

    this.spatialExtents = this.spatialExtents.filter(
      (extent) => extent.description !== key
    )
    this.spatialExtentsChange.emit(this.spatialExtents)

    console.log('keywordsLinkedToExtents', this.keywordsLinkedToExtents)
    // remove from map
  }
  addGeogrExtent(description: string, coords: GeogrCoords) {
    const coordWest = parseFloat(coords.coordWest)
    const coordSouth = parseFloat(coords.coordSouth)
    const coordEast = parseFloat(coords.coordEast)
    const coordNorth = parseFloat(coords.coordNorth)
    // bbox: minx, miny, maxx, maxy
    this.spatialExtents.push({
      description,
      bbox: [coordWest, coordSouth, coordEast, coordNorth],
    })

    this.spatialExtentsChange.emit(this.spatialExtents)
    console.log('geogrExtent', this.spatialExtents)

    const bboxGeom = this.bboxCoordsToGeometry([
      coordWest,
      coordSouth,
      coordEast,
      coordNorth,
    ])
    this.addToMap(description, bboxGeom)
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

  addToMap(description: string, geometry: Feature) {
    const featureCollection: GeoJSONFeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }
    const geoJSONGeom = new GeoJSON().writeGeometryObject(
      geometry.getGeometry()
    )

    featureCollection.features.push({
      type: 'Feature',
      properties: { description },
      geometry: geoJSONGeom,
    })

    this.mapFacade.addLayer({
      type: MapContextLayerTypeEnum.GEOJSON,
      data: featureCollection,
      title: description,
    })
  }

  deleteLayer(index: number) {
    this.mapFacade.removeLayer(index)
  }
}
