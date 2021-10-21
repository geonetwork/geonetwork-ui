import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { PopupAlertComponent } from './popup-alert.component'

export default {
  title: 'Widgets/PopupAlertComponent',
  component: PopupAlertComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<PopupAlertComponent>

const Template: Story<PopupAlertComponent> = (args: PopupAlertComponent) => ({
  component: PopupAlertComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {}
