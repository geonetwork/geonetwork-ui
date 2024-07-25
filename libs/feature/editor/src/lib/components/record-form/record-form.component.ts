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
    const spatialExtentsField = fieldsWithValues.find(
      (field) => field.config.model === 'spatialExtents'
    )
    const placeKeywordsField = fieldsWithValues.find(
      (field) => field.config.id === 'placeKeywords'
    )
    if (spatialExtentsField && placeKeywordsField) {
      return {
        spatialExtentsField,
        placeKeywordsField,
      }
    } else {
      return null
    }
  }
}
