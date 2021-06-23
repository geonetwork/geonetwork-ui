import { number, select, withKnobs } from '@storybook/addon-knobs'
import { Meta } from '@storybook/angular'
import { StepBarComponent } from './step-bar.component'

export default {
  title: 'UI',
  decorators: [withKnobs],
} as Meta

export const StepBarStory = () => ({
  component: StepBarComponent,
  props: {
    steps: number('Number of steps', 6),
    currentStep: number('Current step', 1),
    type: select(
      'Color scheme',
      ['primary', 'secondary', 'default'],
      'default'
    ),
  },
})
StepBarStory.storyName = 'Step bar'
