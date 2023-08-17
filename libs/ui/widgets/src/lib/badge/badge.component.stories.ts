import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'
import { BadgeComponent } from './badge.component'

export default {
  title: 'Widgets/BadgeComponent',
  component: BadgeComponent,
  decorators: [componentWrapperDecorator(BadgeComponent)],
} as Meta<BadgeComponent>

interface BadgeComponentContent extends Partial<BadgeComponent> {
  content: string
}

export const Primary: StoryObj<BadgeComponentContent> = {
  args: {
    clickable: true,
    content: 'My custom badge',
  },
  render: (args) => ({
    props: args,
    template: `<gn-ui-badge>{{content}}</gn-ui-badge>`,
  }),
}
