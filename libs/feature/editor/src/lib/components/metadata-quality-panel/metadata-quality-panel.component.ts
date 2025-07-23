import { CommonModule } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
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

//add translation since field only has section title
marker('editor.record.form.field.contacts')
@Component({
  selector: 'gn-ui-metadata-quality-panel',
  standalone: true,
  imports: [
    CommonModule,
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
export class MetadataQualityPanelComponent implements OnInit {
  propsToValidate: ValidatorMapperKeys[] = [
    'title',
    'abstract',
    'keywords',
    'updateFrequency',
    'topics',
    'legalConstraints',
    'contacts',
  ]
  propertiesByPage: { label: string; value: boolean }[][] = []
  @Input() editorConfig: EditorConfig
  @Input() record: CatalogRecord

  ngOnInit() {
    if (this.editorConfig && this.record) {
      const fieldsByPage = this.editorConfig.pages.map((page) =>
        page.sections.flatMap((section) =>
          section.fields
            .filter(
              (field) =>
                this.propsToValidate.includes(field.model) && !field.hidden
            )
            .map((field) => field.model as ValidatorMapperKeys)
        )
      )
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
      'flex flex-row justify-between rounded mb-1 h-[34px] w-full hover:border-none border-none hover:text-black text-black cursor-default'
    return checked
      ? `${baseClasses} bg-neutral-100 hover:bg-neutral-100`
      : `${baseClasses} bg-transparent hover:bg-transparent`
  }
}
