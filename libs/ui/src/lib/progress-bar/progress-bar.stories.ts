import { withA11y } from '@storybook/addon-a11y'
import { number, select, withKnobs } from '@storybook/addon-knobs'
import { Meta } from '@storybook/angular'
import { ProgressBarComponent } from './progress-bar.component'

export default {
  title: 'UI',
  decorators: [withKnobs, withA11y],
} as Meta

export const ProgressBarStory = () => ({
  component: ProgressBarComponent,
  props: {
    value: number('Value', 30),
    type: select(
      'Color scheme',
      ['primary', 'secondary', 'default'],
      'default'
    ),
  },
})
ProgressBarStory.storyName = 'Progress bar'
