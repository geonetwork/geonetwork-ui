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
import { FeatureMapModule } from '@geonetwork-ui/feature/map'
import {
  AutocompleteComponent,
  DropdownSelectorComponent,
  SwitchToggleComponent,
  UiInputsModule,
} from '@geonetwork-ui/ui/inputs'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'
import { GenericKeywordsComponent } from '../../../generic-keywords/generic-keywords.component'
import { FormFieldMapContainerComponent } from '../form-field-map-container/form-field-map-container.component'
import { Geometry } from 'geojson'
import { Polygon } from 'ol/geom'
import GeoJSON from 'ol/format/GeoJSON'
import { PlatformServiceInterface } from '@geonetwork-ui/common/domain/platform.service.interface'
import { BehaviorSubject } from 'rxjs'

type KeywordLinkedToExtent = {
  [key: string]: {
    placeKeyword?: Keyword
    spatialExtents?: DatasetSpatialExtent
  }
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
    GenericKeywordsComponent,
    FormFieldMapContainerComponent,
  ],
})
export class FormFieldSpatialExtentComponent implements OnInit {
  @Input() placeKeywords: Keyword[]
  @Input() spatialExtents: DatasetSpatialExtent[]

  @Output() placeKeywordChange: EventEmitter<Keyword[]> = new EventEmitter()
  @Output() spatialExtentsChange: EventEmitter<DatasetSpatialExtent[]> =
    new EventEmitter()

  keywordsLinkedToExtents = <KeywordLinkedToExtent>{}

  keywordsWithExtentsObservable$: BehaviorSubject<KeywordLinkedToExtent> =
    new BehaviorSubject({})

  updatedPlaceKeywords: Keyword[]
  updatedSpatialExtents: DatasetSpatialExtent[]

  constructor(private platformService: PlatformServiceInterface) {}

  ngOnInit(): void {
    this.updatedPlaceKeywords = this.placeKeywords
    this.updatedSpatialExtents = this.spatialExtents

    this.linkPlaceKeywordsToSpatialExtents(
      this.updatedPlaceKeywords,
      this.spatialExtents
    )
    this.linkSpatialExtentsToPlaceKeywords(this.spatialExtents)

    this.keywordsWithExtentsObservable$.subscribe((keywords) => {
      this.updatedPlaceKeywords = Object.keys(keywords).map(
        (key) => keywords[key].placeKeyword
      )
      this.updatedSpatialExtents = Object.keys(keywords).map(
        (key) => keywords[key].spatialExtents
      )
    })
  }

  linkPlaceKeywordsToSpatialExtents(
    placeKeywords: Keyword[],
    spatialExtents: DatasetSpatialExtent[]
  ) {
    const newKeywordsLinkedToExtentsReference = {} as KeywordLinkedToExtent

    placeKeywords.forEach((keyword) => {
      let geometry = spatialExtents.find(
        (extent) => extent?.description === keyword?.key
      )?.geometry

      const bbox = spatialExtents.find(
        (extent) => extent?.description === keyword?.key
      )?.bbox

      const description = spatialExtents.find(
        (extent) => extent?.description === keyword?.key
      )?.description

      if (!geometry && keyword.coords) {
        const geometryFromCoords = this.transformCoordsToGeometry(
          keyword.coords?.coordWest,
          keyword.coords?.coordSouth,
          keyword.coords?.coordEast,
          keyword.coords?.coordNorth
        )
        geometry = geometryFromCoords
      }

      newKeywordsLinkedToExtentsReference[keyword?.key] = {
        placeKeyword: keyword as Keyword,
        spatialExtents: {
          geometry: geometry,
          bbox: bbox,
          description: description ? description : keyword.label,
        } as DatasetSpatialExtent,
      }

      return newKeywordsLinkedToExtentsReference
    })

    this.keywordsLinkedToExtents = newKeywordsLinkedToExtentsReference
    this.keywordsWithExtentsObservable$.next(this.keywordsLinkedToExtents)
  }

  transformCoordsToGeometry(
    west: string,
    south: string,
    east: string,
    north: string
  ): Geometry {
    const coordWest = parseFloat(west)
    const coordSouth = parseFloat(south)
    const coordEast = parseFloat(east)
    const coordNorth = parseFloat(north)
    const geometry = new Polygon([
      [
        [coordWest, coordSouth],
        [coordEast, coordSouth],
        [coordEast, coordNorth],
        [coordWest, coordNorth],
        [coordWest, coordSouth],
      ],
    ])

    const geoJSONGeom = new GeoJSON().writeGeometryObject(geometry)
    return geoJSONGeom
  }

  linkSpatialExtentsToPlaceKeywords(spatialExtents: DatasetSpatialExtent[]) {
    spatialExtents.forEach((extent) => {
      if (this.keywordsLinkedToExtents[extent.description]) {
        return
      } else {
        const additionalKeywordsLinkedToExtent = {}

        this.platformService
          .getKeywordsByUri(extent.description)
          .subscribe((keywords) => {
            // What if more than 1 keyword is returned?
            additionalKeywordsLinkedToExtent[extent.description] = {
              spatialExtents: extent,
              placeKeyword:
                keywords[0] !== undefined
                  ? keywords[0]
                  : {
                      key: extent.description,
                      label: 'Unknown location',
                      type: 'place',
                    },
            }
            this.keywordsLinkedToExtents = {
              ...this.keywordsLinkedToExtents,
              ...additionalKeywordsLinkedToExtent,
            }

            this.keywordsWithExtentsObservable$.next(
              this.keywordsLinkedToExtents
            )
          })
      }
    })
  }

  handlePlaceKeywordsChange(keywords: Keyword[]) {
    this.linkPlaceKeywordsToSpatialExtents(keywords, this.updatedSpatialExtents)
  }
}
