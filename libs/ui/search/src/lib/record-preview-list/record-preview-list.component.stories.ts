import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/RecordPreviewListComponent',
  component: RecordPreviewListComponent,
  decorators: [
    moduleMetadata({
      imports: [UtilSharedModule],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<RecordPreviewListComponent>

export const Primary: StoryObj<RecordPreviewListComponent> = {
  args: {
    record: datasetRecordsFixture()[0] as CatalogRecord,
    linkTarget: '_blank',
  },
}
