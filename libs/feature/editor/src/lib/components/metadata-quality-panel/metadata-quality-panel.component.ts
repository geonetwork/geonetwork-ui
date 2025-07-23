import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
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
export class MetadataQualityPanelComponent {
  propsToValidate: ValidatorMapperKeys[] = [
    'title',
    'description',
    'keywords',
    'legalConstraints',
    'contact',
    'updateFrequency',
    'topic',
    'organisation',
    'capabilities',
    'source',
  ]
  properties: { label: string; value: boolean }[] = []
  @Input() set record(value: CatalogRecord) {
    this.properties = getQualityValidators(value, this.propsToValidate).map(
      ({ name, validator }) => ({
        label: `editor.record.form.field.${name}`, // use same translations as in fields.config.ts
        value: validator(),
      })
    )
  }

  getExtraClass(checked: boolean): string {
    const baseClasses =
      'flex flex-row justify-between rounded mb-1 h-[34px] w-full hover:border-none border-none hover:text-black text-black cursor-default'
    return checked
      ? `${baseClasses} bg-neutral-100 hover:bg-neutral-100`
      : `${baseClasses} bg-transparent hover:bg-transparent`
  }
}
