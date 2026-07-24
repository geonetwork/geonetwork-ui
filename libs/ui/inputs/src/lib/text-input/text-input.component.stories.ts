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
    placeholder: 'Put something here!',
    required: false,
    disabled: false,
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
}

export const EmailField: StoryObj<TextInputComponent> = {
  args: {
    value: '',
    type: 'email',
    placeholder: 'This only accepts an email and should not be empty',
    required: true,
    disabled: false,
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
}

export const WithCustomStyle: StoryObj<TextInputComponent> = {
  args: {
    value: '',
    disabled: false,
    placeholder: 'https://mysite.org/file',
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="--gn-ui-text-input-rounded: 8px; --gn-ui-text-input-padding: 14px">
      <gn-ui-text-input [value]='value' [disabled]='disabled' [placeholder]='placeholder' [type]='email'>
      </gn-ui-text-input>
    </div>`,
  }),
}
