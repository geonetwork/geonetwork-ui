import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { FacetBlockComponent } from './facet-block.component'
import { BLOCK_MODEL_FIXTURE } from '../fixtures'
import { TranslateModule } from '@ngx-translate/core'
import { FacetItemComponent } from '../facet-item/facet-item.component'
import { FormsModule } from '@angular/forms'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Search/FacetBlockComponent',
  component: FacetBlockComponent,
  decorators: [
    moduleMetadata({
      declarations: [FacetItemComponent],
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        FormsModule,
      ],
    }),
  ],
} as Meta<FacetBlockComponent>

const Template: Story<FacetBlockComponent> = (args: FacetBlockComponent) => ({
  component: FacetBlockComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  collapsed: false,
  filter: '',
  model: BLOCK_MODEL_FIXTURE,
  selectedPaths: [
    ['tag', 'Austria'],
    ['tag', 'Denmark'],
    ['tag', 'Germany'],
  ],
}
Primary.argTypes = {
  filterChange: {
    action: 'filterChange',
  },
  itemChange: {
    action: 'itemChange',
  },
  more: {
    action: 'more',
  },
}
