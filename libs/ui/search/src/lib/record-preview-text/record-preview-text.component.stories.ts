import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewTextComponent } from './record-preview-text.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import { UtilSharedModule } from '@geonetwork-ui/util/shared'
import { RECORDS_SUMMARY_FIXTURE } from '@geonetwork-ui/util/shared/fixtures'

export default {
  title: 'Search/RecordPreviewTextComponent',
  component: RecordPreviewTextComponent,
  decorators: [
    moduleMetadata({
      imports: [UtilSharedModule, UiElementsModule],
    }),
  ],
} as Meta<RecordPreviewTextComponent>

const Template: Story<RecordPreviewTextComponent> = (
  args: RecordPreviewTextComponent
) => ({
  component: RecordPreviewTextComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  record: RECORDS_SUMMARY_FIXTURE[0],
  linkTarget: '_blank',
}
