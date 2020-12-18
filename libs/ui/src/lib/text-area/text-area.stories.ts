import { withA11y } from '@storybook/addon-a11y'
import { action } from '@storybook/addon-actions'
import { text, withKnobs } from '@storybook/addon-knobs'
import { TextAreaComponent } from './text-area.component'

export default {
  title: 'UI',
  decorators: [withKnobs, withA11y],
}

export const TextAreaStory = () => ({
  component: TextAreaComponent,
  props: {
    value: text('input value', ''),
    change: action('output'),
    placeholder: text('input placeholder', 'Put something here!'),
  },
})
TextAreaStory.storyName = 'Text area'
