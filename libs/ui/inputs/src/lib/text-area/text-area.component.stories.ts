import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { TextAreaComponent } from './text-area.component'

export default {
  title: 'Inputs/TextAreaComponent',
  component: TextAreaComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<TextAreaComponent>

const Template: Story<TextAreaComponent> = (args: TextAreaComponent) => ({
  component: TextAreaComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  value: '',
  placeholder: 'Put something here!',
  required: false,
}
Primary.argTypes = {
  valueChange: {
    action: 'valueChange',
  },
}
