import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { MetadataPageComponent } from './metadata-page.component'
import { UiElementsModule } from '../ui-elements.module'
import {
  RECORDS_FULL_FIXTURE,
  RECORDS_SUMMARY_FIXTURE,
} from '@geonetwork-ui/ui/search'

export default {
  title: 'Elements/MetadataPageComponent',
  component: MetadataPageComponent,
  decorators: [
    moduleMetadata({
      imports: [UiElementsModule],
    }),
  ],
} as Meta<MetadataPageComponent>

const Template: Story<MetadataPageComponent> = (
  args: MetadataPageComponent
) => ({
  component: MetadataPageComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  metadata: RECORDS_FULL_FIXTURE[0],
  incomplete: false,
}
