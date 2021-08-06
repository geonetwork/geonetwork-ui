import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewTitleComponent } from './record-preview-title.component'
import { RECORDS_SUMMARY_FIXTURE } from '../facets/fixtures'
import { RecordThumbnailComponent } from '../record-thumbnail/record-thumbnail.component'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'

export default {
  title: 'RecordPreviewTitleComponent',
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
