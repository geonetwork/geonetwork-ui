import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import { EditorFieldValue } from '../../models'
import { FormFieldComponent } from './form-field'
import { TranslateDirective } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models'
import { map } from 'rxjs'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormFieldComponent, TranslateDirective],
})
export class RecordFormComponent {
  recordUniqueIdentifier$ = this.facade.record$.pipe(
    map((record) => record.uniqueIdentifier)
  )

  constructor(public facade: EditorFacade) {}

  handleFieldValueChange(model: CatalogRecordKeys, newValue: EditorFieldValue) {
    if (!model) {
      return
    }
    this.facade.updateRecordField(model, newValue)
  }

  fieldTracker(index: number, field: EditorFieldWithValue) {
    return field.config.model
  }

  sectionTracker(index: number, section: EditorSectionWithValues) {
    return section.labelKey
  }
}
