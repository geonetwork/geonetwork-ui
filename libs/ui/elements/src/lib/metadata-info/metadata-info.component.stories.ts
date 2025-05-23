import { provideI18n } from '@geonetwork-ui/util/i18n'
import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { MetadataInfoComponent } from './metadata-info.component'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { DatasetRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Elements/MetadataInfoComponent',
  component: MetadataInfoComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<MetadataInfoComponent>

export const Primary: StoryObj<MetadataInfoComponent> = {
  args: {
    metadata: datasetRecordsFixture()[0] as Partial<DatasetRecord>,
    incomplete: false,
  },
}
