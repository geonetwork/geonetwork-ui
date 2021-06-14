import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { of } from 'rxjs'
import { AutocompleteComponent } from './autocomplete.component'

export default {
  title: 'UI',
  decorators: [withKnobs, withA11y],
}

export const AutoCompleteStory = () => ({
  component: AutocompleteComponent,
  props: {
    placeholder: 'Full text search',
    action: (term) => of(['Hello', 'World']),
  },
})
AutoCompleteStory.storyName = 'Auto complete'
