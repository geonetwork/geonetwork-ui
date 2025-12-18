import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { MetadataQualityComponent } from './metadata-quality.component.js'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'

export default {
  title: 'Elements/MetadataQualityComponent',
  component: MetadataQualityComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<MetadataQualityComponent>

export const Primary: StoryObj<MetadataQualityComponent> = {
  args: {
    popoverDisplay: true,
    smaller: false,
    metadataQualityDisplay: true,
    metadata: datasetRecordsFixture()[0] as CatalogRecord,
  },
}
