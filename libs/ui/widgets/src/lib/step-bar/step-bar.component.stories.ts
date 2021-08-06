import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { StepBarComponent } from './step-bar.component'

export default {
  title: 'Widgets/StepBarComponent',
  component: StepBarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<StepBarComponent>

const Template: Story<StepBarComponent> = (args: StepBarComponent) => ({
  component: StepBarComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  steps: 6,
  currentStep: 1,
  type: 'default',
}
Primary.argTypes = {
  type: {
    control: 'select',
    options: ['primary', 'secondary', 'default'],
  },
}
