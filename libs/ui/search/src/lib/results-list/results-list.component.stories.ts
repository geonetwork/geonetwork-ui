import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { DEFAULT_RESULTS_LAYOUT_CONFIG } from './results-layout.config.js'
import { ResultsListComponent } from './results-list.component.js'
import { RecordPreviewListComponent } from '../record-preview-list/record-preview-list.component.js'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component.js'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component.js'
import { RecordPreviewTitleComponent } from '../record-preview-title/record-preview-title.component.js'
import { ResultsListItemComponent } from '../results-list-item/results-list-item.component.js'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record/index.js'

export default {
  title: 'Search/ResultsListComponent',
  component: ResultsListComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RecordPreviewListComponent,
        RecordPreviewCardComponent,
        RecordPreviewTextComponent,
        RecordPreviewTitleComponent,
        ResultsListItemComponent,
      ],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<ResultsListComponent>

type ResultsListComponentWithKey = ResultsListComponent & {
  layoutConfigKey: string
}

export const Primary: StoryObj<ResultsListComponentWithKey> = {
  args: {
    records: datasetRecordsFixture() as CatalogRecord[],
    layoutConfigKey: 'CARD',
  },
  argTypes: {
    layoutConfigKey: {
      control: 'radio',
      options: Object.keys(DEFAULT_RESULTS_LAYOUT_CONFIG),
    },
  },
  render: (args) => ({
    props: {
      ...args,
      layoutConfig: DEFAULT_RESULTS_LAYOUT_CONFIG[args.layoutConfigKey],
      recordUrlGetter: (record: CatalogRecord) =>
        `/my/record/${record.uniqueIdentifier}/open`,
    },
  }),
}
