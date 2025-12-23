import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade.js'
import { EditorFieldValue } from '../../models/index.js'
import { FormFieldComponent } from './form-field/index.js'
import { TranslateDirective } from '@ngx-translate/core'
import {
  EditorFieldWithValue,
  EditorSectionWithValues,
} from '../../+state/editor.models.js'
import { map } from 'rxjs'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record/index.js'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormFieldComponent, TranslateDirective],
})
export class RecordFormComponent {
  facade = inject(EditorFacade)

  recordUniqueIdentifier$ = this.facade.record$.pipe(
    map((record) => record.uniqueIdentifier)
  )

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
