import { Component, Input, OnChanges, inject } from '@angular/core'
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
import { EditorFacade } from '../../+state/editor.facade'

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
  private readonly facade = inject(EditorFacade)

  propsToValidate: ValidatorMapperKeys[] = getAllKeysValidator()
  propertiesByPage: {
    label: string
    value: boolean
    model: ValidatorMapperKeys
    pageIndex: number
  }[][] = []
  @Input() editorConfig: EditorConfig
  @Input() record: CatalogRecord

  ngOnChanges() {
    if (this.editorConfig && this.record) {
      const fieldsByPage = this.editorConfig.pages.map((page, pageIndex) => ({
        pageIndex,
        models: page.sections.flatMap((section) =>
          section.fields
            .filter((field) => this.propsToValidate.includes(field.model))
            .map((field) => field.model as ValidatorMapperKeys)
        ),
      }))
      // FIXME: organisation is not yet a form field in the editor; show it on page 2 as non-navigable
      if (fieldsByPage[2] && !fieldsByPage[2].models.includes('organisation')) {
        fieldsByPage[2].models.push('organisation')
      }
      this.propertiesByPage = fieldsByPage
        .map(({ pageIndex, models }) =>
          getQualityValidators(this.record, models).map(
            ({ name, validator }) => ({
              label: `editor.record.form.field.${name}`, // use same translations as in fields.config.ts
              value: validator(),
              model: name as ValidatorMapperKeys,
              // FIXME: see above
              pageIndex: name === 'organisation' ? -1 : pageIndex,
            })
          )
        )
        .filter((arr) => arr.length > 0)
    }
  }

  onCriterionClick(property: {
    value: boolean
    model: ValidatorMapperKeys
    pageIndex: number
  }) {
    if (!property.value && property.pageIndex >= 0) {
      this.facade.navigateToQualityField(property.pageIndex, property.model)
    }
  }

  getExtraClass(checked: boolean, pageIndex: number): string {
    const isClickable = !checked && pageIndex >= 0
    const baseClasses = `flex flex-row justify-between rounded mb-1 h-[34px] w-full focus:ring-0 hover:border-none border-none hover:text-black text-black ${isClickable ? 'cursor-pointer' : 'cursor-default'}`
    if (checked) {
      return `${baseClasses} bg-neutral-100 hover:bg-neutral-100`
    }
    // FIXME: for fields that are not yet handled by the editor (pageIndex -1)
    if (isClickable) {
      return `${baseClasses} bg-transparent hover:bg-gray-100`
    }
    return `${baseClasses} bg-transparent hover:bg-transparent`
  }
}
