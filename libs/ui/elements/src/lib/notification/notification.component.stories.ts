import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { NotificationComponent } from './notification.component'

export default {
  title: 'Elements/NotificationComponent',
  component: NotificationComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 600px; resize: horizontal; overflow: auto">
  ${story}
</div>`
    ),
  ],
  argTypes: {
    notificationClose: {
      action: 'notificationClose',
    },
    type: {
      control: false,
    },
  },
} as Meta<NotificationComponent>

export const Primary: StoryObj<NotificationComponent> = {
  args: {
    title: '',
    text: "This is a message relevant for the current context! Close me once you're done reading it.",
    closeMessage: 'Understood',
  },
  render: (args) => ({
    props: args,
    template: `<div class='flex flex-col gap-5'>
  <gn-ui-notification type='success'
      [title]="title || 'Good news, everyone!'"
      [text]='text'
      [closeMessage]='closeMessage'
      (notificationClose)='notificationClose($event)'></gn-ui-notification>
  <gn-ui-notification type='warning'
      [title]="title || 'Uh oh!'"
      [text]='text'
      [closeMessage]='closeMessage'
      (notificationClose)='notificationClose($event)'></gn-ui-notification>
  <gn-ui-notification type='error'
      [title]="title || 'Can\\'t connect'"
      [text]='text'
      [closeMessage]='closeMessage'
      (notificationClose)='notificationClose($event)'></gn-ui-notification>
  <gn-ui-notification type='info'
      [title]="title || 'Hey, did you know...'"
      [text]='text'
      [closeMessage]='closeMessage'
      (notificationClose)='notificationClose($event)'></gn-ui-notification>
</div>`,
  }),
}
