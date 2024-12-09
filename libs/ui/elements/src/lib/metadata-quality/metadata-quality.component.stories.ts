import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { MetadataQualityComponent } from './metadata-quality.component'
import { CommonModule } from '@angular/common'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { PopoverComponent } from '@geonetwork-ui/ui/widgets'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Elements/MetadataQualityComponent',
  component: MetadataQualityComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
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
    metadata: datasetRecordsFixture()[0] as Partial<CatalogRecord>,
    metadataQualityDisplay: true,
  },
}
