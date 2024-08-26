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
    disabled: false,
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
}

export const WithCustomStyle: StoryObj<TextAreaComponent> = {
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
      <gn-ui-text-area [value]='value' [disabled]='disabled' [placeholder]='placeholder'>
      </gn-ui-text-area>
    </div>`,
  }),
}
