import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { FacetBlockComponent } from './facet-block.component'
import { blockModelFixture } from '../fixtures'
import { FacetItemComponent } from '../facet-item/facet-item.component'
import { FormsModule } from '@angular/forms'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Search/FacetBlockComponent',
  component: FacetBlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [FacetItemComponent],
      imports: [FormsModule],
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
