import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewCardComponent } from './record-preview-card.component'
import { ThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
import {
  RECORDS_SUMMARY_FIXTURE,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'

export default {
  title: 'Search/RecordPreviewCardComponent',
  component: RecordPreviewCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [UtilSharedModule],
    }),
  ],
} as Meta<RecordPreviewCardComponent>

const Template: Story<RecordPreviewCardComponent> = (
  args: RecordPreviewCardComponent
) => ({
  component: RecordPreviewCardComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  record: RECORDS_SUMMARY_FIXTURE[0],
  linkTarget: '_blank',
}
