import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { TranslateModule } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { FormFieldArrayComponent } from './form-field-array/form-field-array.component'
import { FormFieldFileComponent } from './form-field-file/form-field-file.component'
import { FormFieldObjectComponent } from './form-field-object/form-field-object.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldTemporalExtentComponent } from './form-field-temporal-extent/form-field-temporal-extent.component'
import { FormFieldConfig } from './form-field.model'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'gn-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormFieldSimpleComponent,
    FormFieldRichComponent,
    FormFieldObjectComponent,
    FormFieldSpatialExtentComponent,
    FormFieldTemporalExtentComponent,
    FormFieldFileComponent,
    FormFieldArrayComponent,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
  ],
})
export class FormFieldComponent {
  @Input() model: string
  @Input() config: FormFieldConfig
  @Input() set value(v: unknown) {
    this.formControl.setValue(v, {
      emitEvent: false,
    })
  }
  @Output() valueChange: Observable<unknown>

  formControl = new FormControl()

  constructor() {
    this.valueChange = this.formControl.valueChanges
  }

  get simpleType() {
    return this.config.type as
      | 'date'
      | 'url'
      | 'text'
      | 'number'
      | 'list'
      | 'toggle'
  }

  get isSimpleField() {
    return (
      this.config.type === 'text' ||
      this.config.type === 'number' ||
      this.config.type === 'date' ||
      this.config.type === 'list' ||
      this.config.type === 'url' ||
      this.config.type === 'toggle'
    )
  }
  get isFileField() {
    return this.config.type === 'file'
  }
  get isSpatialExtentField() {
    return this.config.type === 'spatial_extent'
  }
  get isTemporalExtentField() {
    return this.config.type === 'temporal_extent'
  }
  get isArrayField() {
    return this.config.type === 'array'
  }
  get isObjectField() {
    return this.config.type === 'object'
  }

  get isFieldOk() {
    return !this.config.locked && !this.config.invalid
  }
  get isFieldLocked() {
    return this.config.locked
  }
  get isFieldInvalid() {
    return !this.config.locked && this.config.invalid
  }

  get isAbstract() {
    return this.model === 'abstract'
  }
}
