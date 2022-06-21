import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewTitleComponent } from './record-preview-title.component'
import { RecordThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
import {
  RECORDS_SUMMARY_FIXTURE,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'

export default {
  title: 'Search/RecordPreviewTitleComponent',
  component: RecordPreviewTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [RecordThumbnailComponent],
      imports: [UtilSharedModule],
    }),
  ],
} as Meta<RecordPreviewTitleComponent>

const Template: Story<RecordPreviewTitleComponent> = (
  args: RecordPreviewTitleComponent
) => ({
  component: RecordPreviewTitleComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  record: RECORDS_SUMMARY_FIXTURE[0],
  linkTarget: '_blank',
}
