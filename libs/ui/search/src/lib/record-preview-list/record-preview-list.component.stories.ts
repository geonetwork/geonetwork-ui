import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'
import { RECORDS_SUMMARY_FIXTURE } from '../facets/fixtures'
import { RecordThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'

export default {
  title: 'RecordPreviewListComponent',
  component: RecordPreviewListComponent,
  decorators: [
    moduleMetadata({
      declarations: [RecordThumbnailComponent],
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
