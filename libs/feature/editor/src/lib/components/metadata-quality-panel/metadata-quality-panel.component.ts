import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ButtonComponent } from '@geonetwork-ui/ui/inputs'
import {
  NgIconComponent,
  provideIcons,
  provideNgIconsConfig,
} from '@ng-icons/core'
import { iconoirBadgeCheck, iconoirSystemShut } from '@ng-icons/iconoir'
import { TranslateDirective, TranslatePipe } from '@ngx-translate/core'

//FIXME: remove mock
const METADATA_QUALITY_MOCK = {
  title: true,
  abstract: true,
  keywords: false,
}

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
  //FIXME: to be replaced by input or data provided by service
  properties = Object.entries(METADATA_QUALITY_MOCK).map(([key, value]) => ({
    // use same translations as in fields.config.ts
    label: `editor.record.form.field.${key}`,
    value,
  }))

  getExtraClass(checked: boolean): string {
    const baseClasses =
      'flex flex-row justify-between rounded mb-1 h-[34px] w-full hover:border-none border-none hover:text-black text-black cursor-default'
    return checked
      ? `${baseClasses} bg-neutral-100 hover:bg-neutral-100`
      : `${baseClasses} bg-transparent hover:bg-transparent`
  }
}
