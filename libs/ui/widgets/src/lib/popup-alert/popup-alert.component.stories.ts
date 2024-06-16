import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'
import { PopupAlertComponent } from './popup-alert.component'

export default {
  title: 'Widgets/PopupAlertComponent',
  component: PopupAlertComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 600px; height:300px; resize: both; overflow: auto">
  ${story}
</div>`
    ),
  ],
  argTypes: {
    position: {
      control: 'radio',
      options: ['top', 'bottom'],
    },
    type: {
      control: 'select',
      options: ['info', 'warning', 'danger'],
    },
  },
} as Meta<PopupAlertComponent>

type PopupAlertComponentWithContent = PopupAlertComponent & { content: string }

const content =
  'Something went wrong during a task that was probably too complicated, you should probably <a href="https://www.google.com">look for answers</a> and come back!'

export const Primary: StoryObj<PopupAlertComponentWithContent> = {
  args: {
    icon: 'error_outline',
    position: 'top',
    type: 'info',
  },
  render: (args) => ({
    props: args,
    template: `<gn-ui-popup-alert [icon]='icon' [position]='position' [type]='type'>${content}</gn-ui-popup-alert>`,
  }),
}
