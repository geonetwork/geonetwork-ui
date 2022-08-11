import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import {
  RECORDS_FULL_FIXTURE,
  RECORDS_SUMMARY_FIXTURE,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'
import { RecordPreviewFeedComponent } from './record-preview-feed.component'

export default {
  title: 'Search/RecordPreviewFeedComponent',
  component: RecordPreviewFeedComponent,
  decorators: [
    moduleMetadata({
      imports: [UtilSharedModule, UiElementsModule],
    }),
  ],
} as Meta<RecordPreviewFeedComponent>

const Template: Story<RecordPreviewFeedComponent> = (
  args: RecordPreviewFeedComponent
) => ({
  component: RecordPreviewFeedComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  record: RECORDS_FULL_FIXTURE[0],
  linkTarget: '_blank',
}
