import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { EditorService, FormField } from '../services/editor.service'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class RecordFormComponent {
  constructor(public editorService: EditorService) {}

  handleFieldValueChange(fieldName: string, value: unknown) {
    this.editorService.updateRecordField(fieldName, value)
  }

  fieldTracker(index: number, field: FormField) {
    return field.config.model
  }
}
