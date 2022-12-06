import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import { FormFieldConfig } from './form-field.model'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldArrayComponent } from './form-field-array/form-field-array.component'
import { FormFieldObjectComponent } from './form-field-object/form-field-object.component'
import { FormFieldFileComponent } from './form-field-file/form-field-file.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldTemporalExtentComponent } from './form-field-temporal-extent/form-field-temporal-extent.component'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'gn-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent {
  @Input() config: FormFieldConfig
  formControl = new FormControl()

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
}
