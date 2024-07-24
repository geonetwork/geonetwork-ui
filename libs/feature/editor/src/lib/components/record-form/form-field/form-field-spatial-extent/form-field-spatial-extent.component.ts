import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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
  MapContextService,
  MapFacade,
  MapManagerService,
  MapStyleService,
} from '@geonetwork-ui/feature/map'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  SwitchToggleComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { getOptionalMapConfig, MapConfig } from '@geonetwork-ui/util/app-config'

import { GeoJSONFeatureCollection } from 'ol/format/GeoJSON'
import { Polygon } from 'ol/geom'
import { Fill, Stroke, Style } from 'ol/style'
import { map, Observable } from 'rxjs'

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

  @Output() geogrExtentChange: EventEmitter<DatasetSpatialExtent[]> =
    new EventEmitter()
  // @Output() coverageChange: EventEmitter<Coverage> = new EventEmitter()

  // mapContext: MapContextModel = {
  //   view: {
  //     center: [4, 42],
  //     zoom: 6,
  //   },
  //   layers: [DEFAULT_BASELAYER_CONTEXT],
  // }
  mapContext$: Observable<MapContextModel> = this.mapFacade.layers$.pipe(
    map((layers) => ({
      view: {
        center: [4, 42],
        zoom: 6,
      },
      layers: [DEFAULT_BASELAYER_CONTEXT, ...layers],
    }))
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
    private mapContextService: MapContextService,
    private mapManagerService: MapManagerService
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
  }

  removeKeyword(index: number, label: string) {
    const removedKeywords = this.control.value.filter((_, i) => i !== index)
    this.control.setValue(removedKeywords)

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

    // const view = this.mapManager.createView({})

    this.mapFacade.addLayer({
      type: MapContextLayerTypeEnum.GEOJSON,
      data: featureCollection,
      title: description,
    })

    // const extent = [coordEast, coordSouth, coordWest, coordNorth] as [
    //   number,
    //   number,
    //   number,
    //   number
    // ]

    // // zoom to layer (does not work yet)
    const poly = new Polygon([
      [
        [coordEast, coordNorth],
        [coordEast, coordSouth],
        [coordWest, coordSouth],
        [coordWest, coordNorth],
        [coordEast, coordNorth],
      ],
    ])

    // this.mapContext.layers.push({
    //   type: MapContextLayerTypeEnum.GEOJSON,
    //   data: featureCollection,
    // })
    // this.mapContext.view.maxExtent = poly.getExtent()
    // this.mapContext.view.extent = poly.getExtent()

    // console.log('mapContext', this.mapContext)

    this.mapContext$ = this.mapFacade.layers$.pipe(
      map((layers) => ({
        view: {
          maxExtent: poly.getExtent(),
          maxZoom: 12,
        },
        layers: [...layers],
      }))
    )
  }

  deleteLayer(index: number) {
    this.mapFacade.removeLayer(index)
  }
}
