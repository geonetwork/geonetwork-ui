import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  ViewChild,
  afterNextRender,
  inject,
} from '@angular/core'
import { MatTooltipModule } from '@angular/material/tooltip'
import {
  CatalogRecordKeys,
  Constraint,
  DatasetTemporalExtent,
  GraphicOverview,
  Individual,
  Keyword,
  OnlineResource,
  UpdateFrequency,
} from '@geonetwork-ui/common/domain/model/record'
import { EditableLabelDirective } from '@geonetwork-ui/ui/inputs'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { TranslateModule } from '@ngx-translate/core'
import {
  FormFieldDateUpdatedComponent,
  FormFieldLicenseComponent,
  FormFieldTemporalExtentsComponent,
} from '.'
import {
  FieldModelSpecifier,
  FormFieldComponentName,
  FormFieldConfig,
} from '../../../models'
import { FormFieldArrayComponent } from './form-field-array/form-field-array.component'
import { FormFieldContactsForResourceComponent } from './form-field-contacts-for-resource/form-field-contacts-for-resource.component'
import { FormFieldContactsComponent } from './form-field-contacts/form-field-contacts.component'
import { FormFieldFileComponent } from './form-field-file/form-field-file.component'
import { FormFieldKeywordsComponent } from './form-field-keywords/form-field-keywords.component'
import { FormFieldObjectComponent } from './form-field-object/form-field-object.component'
import { FormFieldOnlineLinkResourcesComponent } from './form-field-online-link-resources/form-field-online-link-resources.component'
import { FormFieldOnlineResourcesComponent } from './form-field-online-resources/form-field-online-resources.component'
import { FormFieldOpenDataComponent } from './form-field-open-data/form-field-open-data.component'
import { FormFieldOverviewsComponent } from './form-field-overviews/form-field-overviews.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency/form-field-update-frequency.component'
import { FormFieldConstraintsShortcutsComponent } from './form-field-constraints-shortcuts/form-field-constraints-shortcuts.component'
import { FormFieldConstraintsComponent } from './form-field-constraints/form-field-constraints.component'
import { TextFieldModule } from '@angular/cdk/text-field'

@Component({
  selector: 'gn-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    EditableLabelDirective,
    MatTooltipModule,
    FormFieldWrapperComponent,
    FormFieldLicenseComponent,
    FormFieldDateUpdatedComponent,
    FormFieldUpdateFrequencyComponent,
    FormFieldTemporalExtentsComponent,
    FormFieldSimpleComponent,
    FormFieldRichComponent,
    FormFieldObjectComponent,
    FormFieldSpatialExtentComponent,
    FormFieldFileComponent,
    FormFieldArrayComponent,
    FormFieldKeywordsComponent,
    FormFieldOverviewsComponent,
    FormFieldContactsForResourceComponent,
    FormFieldOpenDataComponent,
    FormFieldOnlineResourcesComponent,
    FormFieldOnlineLinkResourcesComponent,
    FormFieldContactsComponent,
    FormFieldConstraintsComponent,
    FormFieldConstraintsShortcutsComponent,
    TextFieldModule,
  ],
})
export class FormFieldComponent {
  @Input() uniqueIdentifier: string
  @Input() model: CatalogRecordKeys
  @Input() modelSpecifier: FieldModelSpecifier
  @Input() componentName: FormFieldComponentName

  @Input() config: FormFieldConfig
  @Input() value: unknown

  @Output() valueChange: EventEmitter<unknown> = new EventEmitter()

  @ViewChild('titleInput') titleInput: ElementRef
  isOpenData = false
  isHidden = false

  toggleIsOpenData(event: boolean) {
    this.isOpenData = event
  }

  focusTitleInput() {
    this.titleInput.nativeElement.focus()
  }

  get withoutWrapper() {
    return (
      this.model === 'title' ||
      this.model === 'abstract' ||
      this.model === 'legalConstraints' ||
      this.model === 'securityConstraints' ||
      this.model === 'otherConstraints' ||
      this.componentName === 'form-field-constraints-shortcuts'
    )
  }

  get valueAsString() {
    return this.value as string
  }
  get valueAsDate() {
    return this.value as Date
  }

  get valueAsOverviews() {
    return this.value as Array<GraphicOverview>
  }
  get valueAsUpdateFrequency() {
    return this.value as UpdateFrequency
  }
  get valueAsTemporalExtents() {
    return this.value as Array<DatasetTemporalExtent>
  }
  get valueAsKeywords() {
    return this.value as Array<Keyword>
  }
  get valueAsConstraints() {
    return this.value as Array<Constraint>
  }
  get valueAsIndividuals() {
    return this.value as Array<Individual>
  }
  get valueAsOnlineResources() {
    return this.value as Array<OnlineResource>
  }
}
