import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { CatalogTitleComponent } from './catalog-title.component'

export default {
  title: 'Catalog/CatalogTitleComponent',
  component: CatalogTitleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
    }),
  ],
} as Meta<CatalogTitleComponent>

export const Primary: StoryObj<CatalogTitleComponent> = {
  args: {
    name: 'My Metadata Catalog',
    tooltip: 'Amazing content to say the least',
    description: 'A place to look for stuff',
  },
}
