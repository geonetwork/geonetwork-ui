import { Meta, StoryObj } from '@storybook/angular'
import { TextAreaComponent } from './text-area.component'

export default {
  title: 'Inputs/TextAreaComponent',
  component: TextAreaComponent,
  decorators: [],
} as Meta<TextAreaComponent>

export const Primary: StoryObj<TextAreaComponent> = {
  args: {
    value: '',
    placeholder: 'Put something here!',
    required: false,
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
}
