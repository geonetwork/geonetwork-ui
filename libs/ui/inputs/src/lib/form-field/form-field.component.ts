import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core'
import { FormFieldConfig } from './form-field.model'
import { FormControl } from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
  selector: 'gn-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() config: FormFieldConfig
  @Input() set value(v: unknown) {
    this.formControl.setValue(v)
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
  get isRichField() {
    return this.config.type === 'rich'
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
}
