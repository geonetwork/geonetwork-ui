import { Component, inject } from '@angular/core'
import { CatalogRecordKeys } from '@geonetwork-ui/common/domain/model/record'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
  getAllKeysValidator,
  getQualityValidators,
  ValidatorMapperKeys,
} from '@geonetwork-ui/util/shared'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirBadgeCheck, iconoirSystemShut } from '@ng-icons/iconoir'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'
import { EditorFacade } from '../../+state/editor.facade'
import { BehaviorSubject, combineLatest, map } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { FieldFocusDirective } from '../record-form/form-field'

//forced translations that are not available in fields.config.ts
marker('editor.record.form.field.keywords')
marker('editor.record.form.field.topics')
marker('editor.record.form.field.contacts')
marker('editor.record.form.field.organisation')
@Component({
  selector: 'gn-ui-metadata-quality-panel',
  standalone: true,
  imports: [
    TranslateDirective,
    TranslatePipe,
    ButtonComponent,
    NgIconComponent,
    AsyncPipe,
    FieldFocusDirective,
  ],
  providers: [
    provideIcons({
      iconoirSystemShut,
      iconoirBadgeCheck,
    }),
    provideNgIconsConfig({
      size: '1.25em',
    }),
  ],
  templateUrl: './metadata-quality-panel.component.html',
  styleUrl: './metadata-quality-panel.component.css',
})
export class MetadataQualityPanelComponent {
  facade = inject(EditorFacade)
  propsToValidate: ValidatorMapperKeys[] = getAllKeysValidator()

  /** Label of the criterion row currently flashing; reset on the next
   * macrotask so a re-click re-fires. Keyed on the (unique) label, not the
   * model, because contacts and organisation share `model: 'contacts'`. */
  activeRowLabel$ = new BehaviorSubject<string | null>(null)

  propertiesByPage$ = combineLatest([
    this.facade.editorConfig$,
    this.facade.record$,
  ]).pipe(
    map(([editorConfig, record]) => {
      if (!editorConfig || !record) return []
      const validators = getQualityValidators(record, this.propsToValidate)
      return editorConfig.pages
        .map((page) =>
          page.sections
            .flatMap((section) => section.fields)
            .flatMap(({ model }) =>
              validators.filter((v) => (v.alias ?? v.name) === model)
            )
            .map(({ name, validator, alias }) => ({
              label: `editor.record.form.field.${name}`,
              value: validator(),
              model: (alias ?? name) as CatalogRecordKeys,
            }))
        )
        .filter((arr) => arr.length > 0)
    })
  )

  onCriterionClick(property: {
    label: string
    value: boolean
    model: CatalogRecordKeys
  }) {
    if (!property.value) {
      this.facade.setFocusedField(property.model)
      // Flash the clicked row; deferred reset so re-clicking it re-fires.
      this.activeRowLabel$.next(property.label)
      setTimeout(() => this.activeRowLabel$.next(null))
    }
  }
}
