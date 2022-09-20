import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewListComponent } from './record-preview-list.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'

export default {
  title: 'Search/RecordPreviewListComponent',
  component: RecordPreviewListComponent,
  decorators: [
    moduleMetadata({
      imports: [UtilSharedModule, UiElementsModule],
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
