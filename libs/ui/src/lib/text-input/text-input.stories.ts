import { UiModule } from '@lib/ui'
import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import { TextInputComponent } from './text-input.component'

const moduleMetadatas = {
  imports: [UiModule],
}

export default {
  title: 'UI',
  decorators: [withKnobs, withA11y],
}

export const TextInputStory = () => ({
  component: TextInputComponent,
  props: {
    value: text('input value', ''),
    change: action('output'),
    hint: text('input hint', 'Put something here!'),
  },
})
TextInputStory.storyName = 'Text input'
