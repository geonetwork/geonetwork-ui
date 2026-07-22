import { CommonModule } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild,
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
  RecordKind,
  UpdateFrequency,
} from '@geonetwork-ui/common/domain/model/record'
import { FormFieldWrapperComponent } from '@geonetwork-ui/ui/layout'
import { NgIconComponent, provideIcons } from '@ng-icons/core'
import {
  matEditOutline,
  matHelpOutline,
} from '@ng-icons/material-icons/outline'
import { TranslatePipe } from '@ngx-translate/core'
import {
  FieldFocusDirective,
  FormFieldDateComponent,
  FormFieldLicenseComponent,
  FormFieldTemporalExtentsComponent,
} from '.'
import {
  FieldModelSpecifier,
  FormFieldComponentName,
  FormFieldConfig,
} from '../../../models'
import { FormFieldContactsForResourceComponent } from './form-field-contacts-for-resource/form-field-contacts-for-resource.component'
import { FormFieldContactsComponent } from './form-field-contacts/form-field-contacts.component'
import { FormFieldKeywordsComponent } from './form-field-keywords/form-field-keywords.component'
import { FormFieldOnlineLinkResourcesComponent } from './form-field-online-link-resources/form-field-online-link-resources.component'
import { FormFieldOnlineResourcesComponent } from './form-field-online-resources/form-field-online-resources.component'
import { FormFieldOverviewsComponent } from './form-field-overviews/form-field-overviews.component'
import { FormFieldRichComponent } from './form-field-rich/form-field-rich.component'
import { FormFieldSimpleComponent } from './form-field-simple/form-field-simple.component'
import { FormFieldSpatialExtentComponent } from './form-field-spatial-extent/form-field-spatial-extent.component'
import { FormFieldUpdateFrequencyComponent } from './form-field-update-frequency/form-field-update-frequency.component'
import { FormFieldConstraintsShortcutsComponent } from './form-field-constraints-shortcuts/form-field-constraints-shortcuts.component'
import { FormFieldConstraintsComponent } from './form-field-constraints/form-field-constraints.component'
import { TextFieldModule } from '@angular/cdk/text-field'
import { FormFieldSpatialToggleComponent } from './form-field-spatial-toggle/form-field-spatial-toggle.component'
import { FormFieldTopicsComponent } from './form-field-topics/form-field-topics.component'

@Component({
  selector: 'gn-ui-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    MatTooltipModule,
    FormFieldWrapperComponent,
    FormFieldLicenseComponent,
    FormFieldDateComponent,
    FormFieldUpdateFrequencyComponent,
    FormFieldTemporalExtentsComponent,
    FormFieldSimpleComponent,
    FormFieldRichComponent,
    FormFieldSpatialExtentComponent,
    FormFieldKeywordsComponent,
    FormFieldOverviewsComponent,
    FormFieldContactsForResourceComponent,
    FormFieldOnlineResourcesComponent,
    FormFieldOnlineLinkResourcesComponent,
    FormFieldContactsComponent,
    FormFieldConstraintsComponent,
    FormFieldConstraintsShortcutsComponent,
    FormFieldSpatialToggleComponent,
    FormFieldTopicsComponent,
    TextFieldModule,
    NgIconComponent,
  ],
  providers: [provideIcons({ matEditOutline, matHelpOutline })],
  hostDirectives: [FieldFocusDirective],
})
export class FormFieldComponent {
  @Input() uniqueIdentifier: string
  @Input() recordKind: RecordKind
  @Input() model: CatalogRecordKeys
  @Input() modelSpecifier: FieldModelSpecifier
  @Input() componentName: FormFieldComponentName

  @Input() config: FormFieldConfig
  @Input() value: unknown

  @Output() valueChange: EventEmitter<unknown> = new EventEmitter()

  @ViewChild('titleInput') titleInput: ElementRef
  isOpenData = false

  fieldFocus = inject(FieldFocusDirective)

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
  get valueAsTopics() {
    return this.value as Array<string>
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
  get valueAsResourceIdentifierCode() {
    const identifiers = this.value as Array<{
      code: string
      codeSpace?: string
      url?: string
    }>
    return identifiers?.[0]?.code || ''
  }

  handleResourceIdentifierChange(code: string) {
    const identifiers = this.value as Array<{
      code: string
      codeSpace?: string
      url?: string
    }>

    if (!code) {
      this.valueChange.emit(identifiers?.slice(1) || [])
      return
    }

    if (identifiers?.[0]) {
      this.valueChange.emit([
        { ...identifiers[0], code },
        ...identifiers.slice(1),
      ])
    } else {
      this.valueChange.emit([{ code }])
    }
  }
}
