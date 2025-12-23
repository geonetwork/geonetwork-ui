import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { FormFieldWrapperComponent } from './form-field-wrapper.component.js'
import { TranslateModule } from '@ngx-translate/core'

export default {
  title: 'Layout/FormFieldWrapperComponent',
  component: FormFieldWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [FormFieldWrapperComponent, TranslateModule.forRoot()],
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
