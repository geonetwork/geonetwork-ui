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

import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
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
  @Input() control: FormControl<Keyword[]>
  @Input() geogrExtent?: DatasetSpatialExtent[] = []
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

  @Output() keywordChange: EventEmitter<Keyword[]> = new EventEmitter()
  @Output() geogrExtentChange: EventEmitter<DatasetSpatialExtent[]> =
    new EventEmitter()
  // @Output() coverageChange: EventEmitter<Coverage> = new EventEmitter()

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
    // add initial keywords of type place to map //
    this.control?.value.forEach((keyword) => {
      this.addGeogrExtent(keyword.label, keyword.coords)
    })
    this.keywordChange.emit(this.control.value)

    // handle initial values coming as Input from geogrExtent

    //when creating an extent from a place keyword, the keyword URI should be stored in the extent description; this way, when deleting a place keyword, its corresponding extent can also be removed from the record
    // if an extent comes with a description that is a URI for which no keyword was found, a badge “Unknown location” appears below the keyword selector; this way, the extent can still be deleted
    // if an extent comes with no description: same, an “Unknown location” badge appears
    // if an extent comes with a description that is NOT a URI, the description is shown in the badge

    // this.geogrExtent.forEach((extent) => {
    // add to keywords (in html)
    // add to map
    // fetch keyword with description from thesaurus
    // NOT NEEDED:
    // const uri = 'http://www.naturalearthdata.com/ne_admin#Country/AFG'
    // // extent.description
    // this.platformService.getKeywordsByUri(uri).subscribe((keywords) => {
    //   keywords.forEach((keyword) => {
    //     this.control.setValue([...this.control.value, keyword])
    //     console.log('keyword', keyword)
    //     this.addToMap(
    //       keyword.label,
    //       parseFloat(keyword.coords.coordEast),
    //       parseFloat(keyword.coords.coordSouth),
    //       parseFloat(keyword.coords.coordWest),
    //       parseFloat(keyword.coords.coordNorth)
    //     )
    //   })
    // })
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
    const addedKeywords = [...this.control.value, keyword]

    // remove duplicates from keyword
    const filteredKeywords = addedKeywords.filter((value, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) =>
            t?.label === value?.label &&
            t?.thesaurus?.id === value?.thesaurus?.id &&
            t?.type === value?.type
        )
      )
    })

    this.control.setValue(filteredKeywords)
    this.keywordChange.emit(filteredKeywords)
  }

  removeKeyword(index: number, label: string) {
    const removedKeywords = this.control.value.filter((_, i) => i !== index)
    this.control.setValue(removedKeywords)
    this.keywordChange.emit(removedKeywords)

    this.deleteLayer(index)

    // remove from geogrExtent
    this.geogrExtent = this.geogrExtent.filter(
      (extent) => extent.description !== label
    )
    this.geogrExtentChange.emit(this.geogrExtent)
    console.log('geogrExtent', this.geogrExtent)
  }
  addGeogrExtent(description: string, coords: GeogrCoords) {
    const coordWest = parseFloat(coords.coordWest)
    const coordSouth = parseFloat(coords.coordSouth)
    const coordEast = parseFloat(coords.coordEast)
    const coordNorth = parseFloat(coords.coordNorth)
    // bbox: minx, miny, maxx, maxy
    this.geogrExtent.push({
      description,
      bbox: [coordWest, coordSouth, coordEast, coordNorth],
    })

    this.geogrExtentChange.emit(this.geogrExtent)
    console.log('geogrExtent', this.geogrExtent)

    this.addToMap(description, coordWest, coordSouth, coordEast, coordNorth)
  }

  addToMap(
    description: string,
    coordWest: number,
    coordSouth: number,
    coordEast: number,
    coordNorth: number
  ) {
    const featureCollection: GeoJSONFeatureCollection = {
      type: 'FeatureCollection',
      features: [],
    }

    featureCollection.features.push({
      type: 'Feature',
      properties: { description },
      geometry: {
        coordinates: [
          [
            [coordEast, coordNorth],
            [coordEast, coordSouth],
            [coordWest, coordSouth],
            [coordWest, coordNorth],
            [coordEast, coordNorth],
          ],
        ],
        type: 'Polygon',
      },
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
