import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { EditableLabelDirective } from '@geonetwork-ui/ui/inputs'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { FormFieldArrayComponent } from './form-field-array/form-field-array.component'
import { FormFieldFileComponent } from './form-field-file/form-field-file.component'
import { FormFieldLicenseComponent } from './form-field-license/form-field-license.component'
import { FormFieldObjectComponent } from './form-field-object/form-field-object.component'
import { FormFieldResourceUpdatedComponent } from './form-field-resource-updated/form-field-resource-updated.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldTemporalExtentComponent } from './form-field-temporal-extent/form-field-temporal-extent.component'
import { FormFieldConfig } from './form-field.model'
import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency/form-field-update-frequency.component'

@Component({
  selector: 'gn-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditableLabelDirective,
    MatIconModule,
    MatTooltipModule,
    FormFieldWrapperComponent,
    FormFieldLicenseComponent,
    FormFieldResourceUpdatedComponent,
    FormFieldUpdateFrequencyComponent,
    FormFieldSimpleComponent,
    FormFieldRichComponent,
    FormFieldObjectComponent,
    FormFieldSpatialExtentComponent,
    FormFieldTemporalExtentComponent,
    FormFieldFileComponent,
    FormFieldArrayComponent,
    TranslateModule,
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

  @ViewChild('titleInput') titleInput: ElementRef

  formControl = new FormControl()

  constructor() {
    this.valueChange = this.formControl.valueChanges
  }

  focusTitleInput() {
    this.titleInput.nativeElement.children[0].focus()
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

  get isTitle() {
    return this.model === 'title'
  }
  get isAbstract() {
    return this.model === 'abstract'
  }
  get isLicenses() {
    return this.model === 'licenses'
  }
  get isResourceUpdated() {
    return this.model === 'resourceUpdated'
  }
  get isUpdateFrequency() {
    return this.model === 'updateFrequency'
  }

  get withoutWrapper() {
    return this.model === 'title' || this.model === 'abstract'
  }
}
