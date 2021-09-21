import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { MetadataPageComponent } from './metadata-page.component'
import { UiLayoutModule } from '../ui-layout.module'
import { RECORDS_FULL_FIXTURE } from '@geonetwork-ui/ui/search'

export default {
  title: 'Layout/MetadataPageComponent',
  component: MetadataPageComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule],
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
