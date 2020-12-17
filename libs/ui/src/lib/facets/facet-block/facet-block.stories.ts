import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { FacetItemComponent } from '../facet-item/facet-item.component'
import { BLOCK_MODEL_FIXTURE } from '../fixtures'
import { FacetBlockComponent } from './facet-block.component'

const moduleMetadatas = {
  declarations: [FacetItemComponent],
  imports: [TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)],
}

export default {
  title: 'UI/Facets',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const FacetBlockStory = () => ({
  component: FacetBlockComponent,
  props: {
    collapsed: boolean('collapsed', false),
    canFilter: boolean('canFilter', true),
    filter: text('filter', ''),
    model: object('excluded', BLOCK_MODEL_FIXTURE),
    filterChange: action('output'),
  },
})
FacetBlockStory.storyName = 'Facet block'
