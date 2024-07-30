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
import { GenericFormFieldKeywordsComponent } from '../form-field-keywords-generic/form-field-keywords-generic.component'
import { FormFieldMapContainerComponent } from '../form-field-map-container/form-field-map-container.component'

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
    FormFieldMapContainerComponent,
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

  ngOnInit(): void {
    this.linkPlaceKeywordsToSpatialExtents(
      this.placeKeywords,
      this.spatialExtents
    )
    this.linkSpatialExtentsToPlaceKeywords(
      this.spatialExtents,
      this.placeKeywords
    )
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
      (uri) => !placeKeywords.some(({ key: id }) => uri === id)
    )

    missingPlaces.forEach((missingPlace) => {
      this.placeKeywords.push(
        this.keywordsLinkedToExtents[missingPlace].placeKeyword
      )
    })
  }

  handlePlaceKeywordsChange(keywords: Keyword[]) {
    this.keywordsLinkedToExtents = []
    this.linkPlaceKeywordsToSpatialExtents(keywords, this.spatialExtents)

    // add / remove layers
    // update this.keywordsLinkedToExtents
  }
}
