import { Meta, StoryObj } from '@storybook/angular'
import { UrlInputComponent } from './url-input.component'

export default {
  title: 'Inputs/UrlInputComponent',
  component: UrlInputComponent,
  decorators: [],
} as Meta<UrlInputComponent>

export const Primary: StoryObj<UrlInputComponent> = {
  args: {
    value: '',
    disabled: false,
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
}

export const WithCustomStyle: StoryObj<UrlInputComponent> = {
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
      <gn-ui-url-input [value]='value' [disabled]='disabled' [placeholder]='placeholder' (valueChange)='valueChange($event)'>
      </gn-ui-url-input>
    </div>`,
  }),
}

export const WithoutUploadButton: StoryObj<UrlInputComponent> = {
  args: {
    value: '',
    disabled: false,
    placeholder: 'https://mysite.org/file',
    showUploadButton: false,
  },
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-url-input [value]='value' [disabled]='disabled' [placeholder]='placeholder' [showUploadButton]='showUploadButton' (valueChange)='valueChange($event)'>
    </gn-ui-url-input>`,
  }),
}
