import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { FacetBlockComponent } from './facet-block.component.js'
import { blockModelFixture } from '../fixtures.js'
import { FacetItemComponent } from '../facet-item/facet-item.component.js'
import { FormsModule } from '@angular/forms'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Search/FacetBlockComponent',
  component: FacetBlockComponent,
  decorators: [
    moduleMetadata({
      imports: [FacetItemComponent, FormsModule],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<FacetBlockComponent>

export const Primary: StoryObj<FacetBlockComponent> = {
  args: {
    collapsed: false,
    filter: '',
    model: blockModelFixture(),
    selectedPaths: [
      ['tag', 'Austria'],
      ['tag', 'Denmark'],
      ['tag', 'Germany'],
    ],
  },
  argTypes: {
    filterChange: {
      action: 'filterChange',
    },
    itemChange: {
      action: 'itemChange',
    },
    more: {
      action: 'more',
    },
  },
}
