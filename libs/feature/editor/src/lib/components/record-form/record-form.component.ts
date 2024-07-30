import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import { EditorFieldValue } from '../../models'
import {
  FormFieldComponent,
  FormFieldSpatialExtentComponent,
} from './form-field'
import { TranslateModule } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models'
import {
  DatasetSpatialExtent,
  Keyword,
} from '@geonetwork-ui/common/domain/model/record'
import { KeywordType } from '@geonetwork-ui/common/domain/model/thesaurus'

const DUMMY_DATA_PLACE_KEYWORDS = [
  {
    key: 'uri1',
    label: 'Berlin',
    thesaurus: {
      id: '1',
      name: 'GEMET',
    },
    type: 'place' as KeywordType,
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
    type: 'place' as KeywordType,
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
    type: 'place' as KeywordType,
    coords: {
      coordEast: '11.5',
      coordNorth: '48.5',
      coordSouth: '48.5',
      coordWest: '11.5',
    },
  },
]

const DUMMY_DATA_SPATIAL_EXTENTS = [
  {
    description: 'uri1',
    bbox: [13.5, 52.5, 14.5, 53.5] as [number, number, number, number],
  },
  {
    description: 'uri2',
    bbox: [10, 53.5, 11, 53.4] as [number, number, number, number],
  },
  {
    description: 'uri3',
    bbox: [11.5, 48.5, 11.5, 48.3] as [number, number, number, number],
  },
  {
    description: 'URI-Paris',
    bbox: [1, 2, 3, 4] as [number, number, number, number],
  },
]
@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormFieldComponent,
    TranslateModule,
    FormFieldSpatialExtentComponent,
  ],
})
export class RecordFormComponent {
  constructor(public facade: EditorFacade) {}

  handleFieldValueChange(model: string, newValue: EditorFieldValue) {
    if (!model) {
      return
    }
    this.facade.updateRecordField(model, newValue)
  }

  fieldTracker(index: number, field: EditorFieldWithValue): any {
    return field.config.model
  }

  sectionTracker(index: number, section: EditorSectionWithValues): any {
    return section.labelKey
  }

  filterSpatialExtentsFields(
    fieldsWithValues: EditorFieldWithValue[]
  ): EditorFieldWithValue[] {
    return fieldsWithValues.filter(
      (field) =>
        field.config.model !== 'spatialExtents' ||
        field.config.id !== 'placeKeywords'
    )
  }

  extractSpatialExtentsFields(fieldsWithValues: EditorFieldWithValue[]) {
    const placeKeywordsField = fieldsWithValues.find(
      (field) => field.config.id === 'placeKeywords'
    )?.value as Keyword[]
    const spatialExtentsField = fieldsWithValues.find(
      (field) => field.config.model === 'spatialExtents'
    )?.value as DatasetSpatialExtent[]
    if (spatialExtentsField && placeKeywordsField) {
      return {
        placeKeywordsField: DUMMY_DATA_PLACE_KEYWORDS,
        spatialExtentsField: DUMMY_DATA_SPATIAL_EXTENTS,
      }
    } else {
      return null
    }
  }
}
