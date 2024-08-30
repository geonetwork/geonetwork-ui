import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { MetadataQualityComponent } from './metadata-quality.component'
import { CommonModule } from '@angular/common'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { MetadataQualityItemComponent } from '../metadata-quality-item/metadata-quality-item.component'
import {
  PopoverComponent,
  ProgressBarComponent,
} from '@geonetwork-ui/ui/widgets'
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
        PopoverComponent,
      ],
    }),
  ],
} as Meta<MetadataQualityComponent>

export const Primary: StoryObj<MetadataQualityComponent> = {
  args: {
    smaller: false,
    metadata: datasetRecordsFixture()[0],
    metadataQualityDisplay: true,
  },
}
