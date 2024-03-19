import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { FormFieldConfig, UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { EditorFacade } from '../+state/editor.facade'
import { FormField } from '../models/fields.model'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'gn-ui-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, UiInputsModule],
})
export class RecordFormComponent {
  fieldsConfig: FormFieldConfig[] = [
    {
      model: 'title',
      labelKey: 'Metadata title',
      type: 'text',
    },
    {
      model: 'abstract',
      labelKey: 'Abstract',
      type: 'rich',
    },
    {
      model: 'uniqueIdentifier',
      labelKey: 'Unique identifier',
      type: 'text',
      locked: true,
    },
  ]

  fields$: Observable<FormField[]> = this.facade.record$.pipe(
    map((record) =>
      this.fieldsConfig.map((fieldConfig) => ({
        config: fieldConfig,
        value: record?.[fieldConfig.model] || null,
      }))
    )
  )

  constructor(public facade: EditorFacade) {}

  handleFieldValueChange(fieldName: string, value: unknown) {
    this.facade.updateRecordField(fieldName, value)
  }

  fieldTracker(index: number, field: FormField) {
    return field.config.model
  }
}
