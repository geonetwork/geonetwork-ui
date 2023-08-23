import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { FacetListComponent } from './facet-list.component'
import { BLOCK_MODEL_FIXTURE } from '../fixtures'
import { FacetItemComponent } from '../facet-item/facet-item.component'
import { TranslateModule } from '@ngx-translate/core'
import { FacetBlockComponent } from '../facet-block/facet-block.component'
import { FormsModule } from '@angular/forms'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Search/FacetListComponent',
  component: FacetListComponent,
  decorators: [
    moduleMetadata({
      declarations: [FacetItemComponent, FacetBlockComponent],
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        FormsModule,
      ],
    }),
  ],
} as Meta<FacetListComponent>

export const Primary: StoryObj<FacetListComponent> = {
  args: {
    models: [
      BLOCK_MODEL_FIXTURE,
      {
        key: 'theme',
        items: [
          { value: 'Environment', count: 12, path: ['theme', 'Environment'] },
          { value: 'Industry', count: 6, path: ['theme', 'Industry'] },
          { value: 'Weather', count: 3, path: ['theme', 'Weather'] },
          { value: 'Agriculture', count: 2, path: ['theme', 'Agriculture'] },
        ],
        path: ['theme'],
        type: 'filters',
        size: 4,
        more: false,
        includeFilter: true,
        excludeFilter: false,
      },
    ],
    selectedPaths: [
      ['tag', 'Cyprus'],
      ['tag', 'Germany'],
      ['theme', 'Weather'],
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
