import { I18nModule } from '@lib/common'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { CheckboxInputComponent } from '../checkbox-input/checkbox-input.component'
import { ListComponent } from './list.component'

const moduleMetadatas = {
  declarations: [CheckboxInputComponent],
  imports: [I18nModule],
}

export default {
  title: 'UI/Facets',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const ListStory = () => ({
  component: ListComponent,
  props: {
    title: text('title', 'my title'),
    canFilter: boolean('canFilter', true),
    filter: text('filter', ''),
    model: object('excluded', {
      key: 'tag',
      items: [
        { value: 'Hungary', count: 20, path: ['tag', 'Hungary'] },
        { value: 'Austria', count: 17, path: ['tag', 'Austria'] },
        { value: 'Belgium', count: 17, path: ['tag', 'Belgium'] },
        { value: 'Bulgaria', count: 17, path: ['tag', 'Bulgaria'] },
        { value: 'Croatia', count: 17, path: ['tag', 'Croatia'] },
        { value: 'Cyprus', count: 17, path: ['tag', 'Cyprus'] },
        { value: 'Czechia', count: 17, path: ['tag', 'Czechia'] },
        { value: 'Denmark', count: 17, path: ['tag', 'Denmark'] },
        { value: 'Estonia', count: 17, path: ['tag', 'Estonia'] },
        { value: 'Finland', count: 17, path: ['tag', 'Finland'] },
        { value: 'France', count: 17, path: ['tag', 'France'] },
        { value: 'Germany', count: 17, path: ['tag', 'Germany'] },
        { value: 'Italy', count: 17, path: ['tag', 'Italy'] },
        { value: 'Latvia', count: 17, path: ['tag', 'Latvia'] },
        { value: 'Luxembourg', count: 17, path: ['tag', 'Luxembourg'] },
        { value: 'Malta', count: 17, path: ['tag', 'Malta'] },
        { value: 'Netherlands', count: 17, path: ['tag', 'Netherlands'] },
        { value: 'Poland', count: 17, path: ['tag', 'Poland'] },
        { value: 'Portugal', count: 17, path: ['tag', 'Portugal'] },
        { value: 'Romania', count: 17, path: ['tag', 'Romania'] },
        { value: 'Slovakia', count: 17, path: ['tag', 'Slovakia'] },
      ],
      path: ['tag'],
      type: 'terms',
      size: 21,
      more: true,
      includeFilter: true,
      excludeFilter: false,
    }),
    filterChange: action('output'),
  },
})
ListStory.storyName = 'List'
