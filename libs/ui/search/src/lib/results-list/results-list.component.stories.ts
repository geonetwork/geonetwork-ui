import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { DEFAULT_RESULTS_LAYOUT_CONFIG } from './results-layout.config'
import { ResultsListComponent } from './results-list.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '../facets/fixtures'
import { RecordPreviewListComponent } from '../record-preview-list/record-preview-list.component'
import { RecordPreviewCardComponent } from '../record-preview-card/record-preview-card.component'
import { RecordPreviewTextComponent } from '../record-preview-text/record-preview-text.component'
import { RecordPreviewTitleComponent } from '../record-preview-title/record-preview-title.component'
import { RecordThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
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
        RecordThumbnailComponent,
      ],
      imports: [
        UtilSharedModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<ResultsListComponent>

const Template: Story<ResultsListComponent> = (args: ResultsListComponent) => ({
  component: ResultsListComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  records: RECORDS_SUMMARY_FIXTURE,
  loading: false,
  layout: 'CARD',
}
Primary.argTypes = {
  layout: {
    control: 'radio',
    options: Object.keys(DEFAULT_RESULTS_LAYOUT_CONFIG),
  },
}
