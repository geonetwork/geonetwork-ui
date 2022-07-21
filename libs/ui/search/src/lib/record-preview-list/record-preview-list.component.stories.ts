import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'
import { ThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
import {
  RECORDS_SUMMARY_FIXTURE,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'

export default {
  title: 'Search/RecordPreviewListComponent',
  component: RecordPreviewListComponent,
  decorators: [
    moduleMetadata({
      declarations: [ThumbnailComponent],
      imports: [UtilSharedModule],
    }),
  ],
} as Meta<RecordPreviewListComponent>

const Template: Story<RecordPreviewListComponent> = (
  args: RecordPreviewListComponent
) => ({
  component: RecordPreviewListComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  record: RECORDS_SUMMARY_FIXTURE[0],
  linkTarget: '_blank',
}
