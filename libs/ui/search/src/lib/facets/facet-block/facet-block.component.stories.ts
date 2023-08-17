import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
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

export const Primary: StoryObj<FacetBlockComponent> = {
  args: {
    collapsed: false,
    filter: '',
    model: BLOCK_MODEL_FIXTURE,
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
