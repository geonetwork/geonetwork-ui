import { TRANSLATE_DEFAULT_CONFIG } from '@lib/common'
import { TranslateModule } from '@ngx-translate/core'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { FacetItemComponent } from './facet-item.component'

const moduleMetadatas = {
  imports: [TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)],
}

export default {
  title: 'UI/Facets',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const FacetItemStory = () => ({
  component: FacetItemComponent,
  props: {
    label: text('label', 'my label'),
    count: number('count', 0),
    selected: boolean('selected', false),
    inverted: boolean('inverted', false),
    selectedChange: action('selectedChange'),
    invertedChange: action('invertedChange'),
  },
})
FacetItemStory.storyName = 'Facet item'
