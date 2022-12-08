import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { FormFieldComponent } from './form-field.component'
import { TranslateModule } from '@ngx-translate/core'

export default {
  title: 'Inputs/FormFieldComponent',
  component: FormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
    }),
    componentWrapperDecorator(
      (story) => `
      <div class="border border-gray-300 p-2 w-[600px] h-[400px] resize overflow-auto">
        ${story}
      </div>`
    ),
  ],
} as Meta<FormFieldComponent>

export const Basic: Story = (args) => ({
  props: {
    config: args,
  },
})

Basic.args = {
  model: 'myModel',
  type: 'text',
  labelKey: 'my.field.label',
  hintKey: 'my.field.hint',
  tooltipKey: 'my.field.tooltip',
  required: false,
  locked: false,
  invalid: false,
  invalidHintKey: '',
}
Basic.argTypes = {
  type: {
    control: 'radio',
    options: [
      'text',
      'number',
      'date',
      'list',
      'url',
      'toggle',
      'rich',
      'file',
      'spatial_extent',
      'temporal_extent',
    ],
  },
}
