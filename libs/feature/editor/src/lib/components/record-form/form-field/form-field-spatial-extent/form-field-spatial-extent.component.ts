import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { FormControl } from '@angular/forms'
import { Keyword } from '@geonetwork-ui/common/domain/model/record'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import {
  FeatureMapModule,
  MapContextLayerTypeEnum,
  MapFacade,
  MapStyleService,
} from '@geonetwork-ui/feature/map'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  SwitchToggleComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
import { Fill, Stroke, Style } from 'ol/style'
import { map } from 'rxjs'

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
export class FormFieldSpatialExtentComponent {
  @Input() control: FormControl<Keyword[]>
  @Input() geogrExtent: GeoJSONFeatureCollection
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

  @Output() geogrExtentChange: EventEmitter<GeoJSONFeatureCollection> =
    new EventEmitter()
  @Output() coverageChange: EventEmitter<Coverage> = new EventEmitter()

  layers$ = this.mapFacade.layers$

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

  handleItemSelection(item: AutocompleteItem) {
    this.addKeyword(item.value)
    this.addGeogrExtent(item.value.label, item.value.coords)
  }
  handleCoverageSelection(coverage: Coverage) {
    console.log('coverage', coverage)
    this.coverageChange.emit(coverage)
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
  }

  removeKeyword(index: number) {
    const removedKeywords = this.control.value.filter((_, i) => i !== index)
    this.control.setValue(removedKeywords)

    this.deleteLayer(index)

    this.geogrExtent.features = this.geogrExtent.features.filter(
      (_, i) => i !== index
    )
    this.geogrExtentChange.emit(this.geogrExtent)
    console.log('geogrExtent', this.geogrExtent)
  }

  addGeogrExtent(description: string, coords: GeogrCoords) {
    const featureCollection = {
      type: 'FeatureCollection',
      features: [
        ...(this.geogrExtent ? this.geogrExtent.features : []),
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [coords.coordEast, coords.coordNorth],
                [coords.coordEast, coords.coordSouth],
                [coords.coordWest, coords.coordSouth],
                [coords.coordWest, coords.coordNorth],
                [coords.coordEast, coords.coordNorth],
              ],
            ],
          },
          properties: {
            description: description,
          },
        },
      ],
    } as GeoJSONFeatureCollection

    this.geogrExtent = featureCollection
    this.geogrExtentChange.emit(this.geogrExtent)
    console.log('geogrExtent', this.geogrExtent)

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
