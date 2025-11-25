import { Component, Input, OnChanges } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
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
import { EditorConfig } from '../../models'
import { marker } from '@biesbjerg/ngx-translate-extract-marker'

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
export class MetadataQualityPanelComponent implements OnChanges {
  propsToValidate: ValidatorMapperKeys[] = getAllKeysValidator()
  propertiesByPage: { label: string; value: boolean }[][] = []
  @Input() editorConfig: EditorConfig
  @Input() record: CatalogRecord

  ngOnChanges() {
    if (this.editorConfig && this.record) {
      const fieldsByPage = this.editorConfig.pages.map((page) =>
        page.sections.flatMap((section) =>
          section.fields
            .filter((field) => this.propsToValidate.includes(field.model))
            .map((field) => field.model as ValidatorMapperKeys)
        )
      )
      // FIXME: temporarily add topics and organisation to the first and third page
      // as long as they are not handled by the editor
      if (fieldsByPage.length > 0) {
        fieldsByPage[0].includes('topics') || fieldsByPage[0].push('topics')
        fieldsByPage[2].includes('organisation') ||
          fieldsByPage[2].push('organisation')
      }
      this.propertiesByPage = fieldsByPage
        .map((fields) =>
          getQualityValidators(
            this.record,
            fields as ValidatorMapperKeys[]
          ).map(({ name, validator }) => ({
            label: `editor.record.form.field.${name}`, // use same translations as in fields.config.ts
            value: validator(),
          }))
        )
        .filter((arr) => arr.length > 0)
    }
  }

  getExtraClass(checked: boolean): string {
    const baseClasses =
      'flex flex-row justify-between rounded mb-1 h-[34px] w-full focus:ring-0 hover:border-none border-none hover:text-black text-black cursor-default'
    return checked
      ? `${baseClasses} bg-neutral-100 hover:bg-neutral-100`
      : `${baseClasses} bg-transparent hover:bg-transparent`
  }
}
