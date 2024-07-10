import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { EditorFacade } from '../../+state/editor.facade'
import {
  EditorField,
  EditorFieldPage,
  EditorFieldValue,
  EditorSection,
} from '../../models'
import { FormFieldComponent } from './form-field'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FormFieldComponent, TranslateModule],
})
export class RecordFormComponent {
  @Input() page: EditorFieldPage

  constructor(public facade: EditorFacade) {}

  handleFieldValueChange(model: string, newValue: EditorFieldValue) {
    if (!model) {
      return
    }
    this.facade.updateRecordField(model, newValue)
  }

  fieldTracker(index: number, field: EditorField): any {
    return field.model
  }

  sectionTracker(index: number, section: EditorSection): any {
    return section.labelKey
  }
}
