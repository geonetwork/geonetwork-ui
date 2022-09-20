import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewCardComponent } from './record-preview-card.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'

export default {
  title: 'Search/RecordPreviewCardComponent',
  component: RecordPreviewCardComponent,
  decorators: [
    moduleMetadata({
      imports: [UtilSharedModule, UiElementsModule],
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
