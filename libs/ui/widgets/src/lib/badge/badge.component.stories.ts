import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular'
import { BadgeComponent } from './badge.component'

export default {
  title: 'Widgets/BadgeComponent',
  component: BadgeComponent,
  decorators: [
    componentWrapperDecorator(BadgeComponent),
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<BadgeComponent>

interface BadgeComponentContent extends Partial<BadgeComponent> {
  content: string
}
const Template: Story<BadgeComponentContent> = (
  args: BadgeComponentContent
) => ({
  component: BadgeComponent,
  props: args,
  template: '<gn-ui-badge>{{content}}</gn-ui-badge>',
})

export const Primary = Template.bind({})
Primary.args = {
  clickable: true,
  content: 'My custom badge',
}
