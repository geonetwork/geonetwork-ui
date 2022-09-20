import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { DEFAULT_RESULTS_LAYOUT_CONFIG } from './results-layout.config'
import { ResultsListComponent } from './results-list.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'
import { RecordPreviewListComponent } from '../record-preview-list/record-preview-list.component'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component'
import { RecordPreviewTitleComponent } from '../record-preview-title/record-preview-title.component'
import { ResultsListItemComponent } from '../results-list-item/results-list-item.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'

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
      imports: [
        UtilSharedModule,
        UtilI18nModule,
        UiElementsModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<ResultsListComponent>

type ResultsListComponentWithKey = ResultsListComponent & {
  layoutConfigKey: string
}

const Template: Story<ResultsListComponentWithKey> = (
  args: ResultsListComponentWithKey
) => ({
  component: ResultsListComponent,
  props: {
    ...args,
    layoutConfig: DEFAULT_RESULTS_LAYOUT_CONFIG[args.layoutConfigKey],
  },
})

export const Primary = Template.bind({})
Primary.args = {
  records: RECORDS_SUMMARY_FIXTURE,
  loading: false,
  layoutConfigKey: 'CARD',
}
Primary.argTypes = {
  layoutConfigKey: {
    control: 'radio',
    options: Object.keys(DEFAULT_RESULTS_LAYOUT_CONFIG),
  },
}
