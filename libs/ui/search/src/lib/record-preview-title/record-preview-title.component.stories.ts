import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { RecordPreviewTitleComponent } from './record-preview-title.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/RecordPreviewTitleComponent',
  component: RecordPreviewTitleComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<RecordPreviewTitleComponent>

export const Primary: StoryObj<RecordPreviewTitleComponent> = {
  args: {
    record: datasetRecordsFixture()[0] as CatalogRecord,
    linkTarget: '_blank',
  },
}
