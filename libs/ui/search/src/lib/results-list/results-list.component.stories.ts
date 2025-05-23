import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { DEFAULT_RESULTS_LAYOUT_CONFIG } from './results-layout.config'
import { ResultsListComponent } from './results-list.component'
import { RecordPreviewListComponent } from '../record-preview-list/record-preview-list.component'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component'
import { RecordPreviewTitleComponent } from '../record-preview-title/record-preview-title.component'
import { ResultsListItemComponent } from '../results-list-item/results-list-item.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { datasetRecordsFixture } from '@geonetwork-ui/common/fixtures'
import { CatalogRecord } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Search/ResultsListComponent',
  component: ResultsListComponent,
  decorators: [
    moduleMetadata({
      declarations: [
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
    },
  }),
}
