import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordPreviewTextComponent } from './record-preview-text.component'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'
import {
  RECORDS_SUMMARY_FIXTURE,
  UtilSharedModule,
} from '@geonetwork-ui/util/shared'

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
