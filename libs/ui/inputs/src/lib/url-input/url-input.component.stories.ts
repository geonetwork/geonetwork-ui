import { Meta, StoryObj } from '@storybook/angular'
import { UrlInputComponent } from './url-input.component'

export default {
  title: 'Inputs/UrlInputComponent',
  component: UrlInputComponent,
  decorators: [],
  argTypes: {
    valueChange: {
      action: 'valueChange',
    },
    uploadClick: {
      action: 'uploadClick',
    },
  },
} as Meta<UrlInputComponent>

export const Primary: StoryObj<UrlInputComponent> = {
  args: {
    value: 'http://aaa.org/bbb',
    placeholder: 'write a URL here',
    disabled: false,
    showUploadButton: true,
  },
}

export const WithCustomStyle: StoryObj<UrlInputComponent> = {
  args: {
    value: 'http://aaa.org/bbb',
    disabled: false,
    placeholder: 'https://mysite.org/file',
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="--gn-ui-text-input-rounded: 8px; --gn-ui-text-input-padding: 14px">
      <gn-ui-url-input [value]='value' [disabled]='disabled' [placeholder]='placeholder'
        (valueChange)='valueChange($event)' (uploadClick)='uploadClick($event)'>
      </gn-ui-url-input>
    </div>`,
  }),
}

export const WithoutUploadButton: StoryObj<UrlInputComponent> = {
  args: {
    value: null,
    disabled: false,
    placeholder: 'https://mysite.org/file',
    showUploadButton: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-url-input [value]='value' [disabled]='disabled' [placeholder]='placeholder' [showUploadButton]='showUploadButton'
      (valueChange)='valueChange($event)' (uploadClick)='uploadClick($event)'>
    </gn-ui-url-input>`,
  }),
}
