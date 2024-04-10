import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import { EditorFieldState, EditorFieldValue } from '../../models/fields.model'
import { FormFieldComponent } from './form-field'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormFieldComponent],
})
export class RecordFormComponent {
  fields$ = this.facade.recordFields$

  constructor(public facade: EditorFacade) {}

  handleFieldValueChange(field: EditorFieldState, newValue: EditorFieldValue) {
    if (!field.config.model) {
      return
    }
    this.facade.updateRecordField(field.config.model, newValue)
  }

  fieldTracker(index: number, field: EditorFieldState) {
    return field.config.model
  }
}
