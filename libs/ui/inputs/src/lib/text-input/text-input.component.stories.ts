import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { TextInputComponent } from './text-input.component'

export default {
  title: 'Inputs/TextInputComponent',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TextInputComponent>

const Template: Story<TextInputComponent> = (args: TextInputComponent) => ({
  component: TextInputComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  value: '',
  hint: 'Put something here!',
  required: false,
}
Primary.argTypes = {
  valueChange: {
    action: 'valueChange',
  },
}
