import { Meta, StoryObj } from '@storybook/angular'
import { TextInputComponent } from './text-input.component'

export default {
  title: 'Inputs/TextInputComponent',
  component: TextInputComponent,
  decorators: [],
} as Meta<TextInputComponent>

export const Primary: StoryObj<TextInputComponent> = {
  args: {
    value: '',
    hint: 'Put something here!',
    required: false,
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
}
