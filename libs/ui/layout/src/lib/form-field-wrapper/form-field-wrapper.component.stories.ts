import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { FormFieldWrapperComponent } from './form-field-wrapper.component'

export default {
  title: 'Layout/FormFieldWrapperComponent',
  component: FormFieldWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [FormFieldWrapperComponent],
    }),
  ],
} as Meta<FormFieldWrapperComponent>

export const Primary: StoryObj<FormFieldWrapperComponent> = {
  args: {
    label: 'Some label',
    hint: 'Some hint',
  },
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-form-field-wrapper
      [label]="label"
      [hint]="hint"
    >
      <button form-field-interaction>Some button</button>
      <div>Some content</div>
    </gn-ui-form-field-wrapper>`,
  }),
}
