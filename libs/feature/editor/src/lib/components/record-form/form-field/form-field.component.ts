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
import {
  FormFieldLicenseComponent,
  FormFieldResourceUpdatedComponent,
  FormFieldTemporalExtentsComponent,
} from '.'
import { FormFieldArrayComponent } from './form-field-array/form-field-array.component'
import { FormFieldFileComponent } from './form-field-file/form-field-file.component'
import { FormFieldObjectComponent } from './form-field-object/form-field-object.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency/form-field-update-frequency.component'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'
import { FormFieldKeywordsComponent } from './form-field-keywords/form-field-keywords.component'
import { FormFieldOverviewsComponent } from './form-field-overviews/form-field-overviews.component'
import { map, take } from 'rxjs/operators'
import { EditorFacade } from '../../../+state/editor.facade'

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
    FormFieldTemporalExtentsComponent,
    FormFieldSimpleComponent,
    FormFieldRichComponent,
    FormFieldObjectComponent,
    FormFieldSpatialExtentComponent,
    FormFieldFileComponent,
    FormFieldArrayComponent,
    FormFieldKeywordsComponent,
    TranslateModule,
    FormFieldOverviewsComponent,
  ],
})
export class FormFieldComponent {
  @Input() model: CatalogRecordKeys
  @Input() config: FormFieldConfig
  @Input() set value(v: unknown) {
    this.formControl.setValue(v, {
      emitEvent: false,
    })
  }

  @Output() valueChange: Observable<unknown>

  @ViewChild('titleInput') titleInput: ElementRef

  metadataUuid$ = this.facade.record$.pipe(
    take(1),
    map((record) => record.uniqueIdentifier)
  )

  formControl = new FormControl()

  constructor(private facade: EditorFacade) {
    this.valueChange = this.formControl.valueChanges
  }

  focusTitleInput() {
    this.titleInput.nativeElement.children[0].focus()
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
  get isTemporalExtents() {
    return this.model === 'temporalExtents'
  }
  get isSpatialExtentField() {
    return this.model === 'spatialExtents'
  }
  get isGraphicOverview() {
    return this.model === 'overviews'
  }
  get isSimpleField() {
    return this.model === 'uniqueIdentifier' || this.model === 'recordUpdated'
  }
  get isReadOnly() {
    return this.model === 'uniqueIdentifier' || this.model === 'recordUpdated'
  }
  get isKeywords() {
    return this.model === 'keywords'
  }

  get withoutWrapper() {
    return this.model === 'title' || this.model === 'abstract'
  }
}
