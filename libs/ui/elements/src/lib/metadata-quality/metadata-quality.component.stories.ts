import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import {
  MetadataQualityComponent,
  MetadataQualityDisplay,
} from './metadata-quality.component'
import { CommonModule } from '@angular/common'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { MetadataQualityItemComponent } from '../metadata-quality-item/metadata-quality-item.component'
import { ProgressBarComponent } from '@geonetwork-ui/ui/widgets'
import { MatIconModule } from '@angular/material/icon'

export default {
  title: 'Elements/MetadataQualityComponent',
  component: MetadataQualityComponent,
  decorators: [
    moduleMetadata({
      declarations: [ProgressBarComponent, MetadataQualityItemComponent],
      imports: [
        CommonModule,
        MatIconModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<MetadataQualityComponent>

export const Primary: StoryObj<MetadataQualityComponent> = {
  args: {
    smaller: false,
    metadata: DATASET_RECORDS[0],
    metadataQualityDisplay: {
      widget: true,
      title: true,
      description: true,
      topic: true,
      keywords: true,
      legalConstraints: true,
      organisation: true,
      contact: true,
      updateFrequency: true,
    } as MetadataQualityDisplay,
  },
}
