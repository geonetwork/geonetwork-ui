import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { CatalogTitleComponent } from './catalog-title.component'

export default {
  title: 'Catalog/CatalogTitleComponent',
  component: CatalogTitleComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CatalogTitleComponent>

const Template: Story<CatalogTitleComponent> = (
  args: CatalogTitleComponent
) => ({
  component: CatalogTitleComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  name: 'My Metadata Catalog',
  tooltip: 'Amazing content to say the least',
  description: 'A place to look for stuff',
}
