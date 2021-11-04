import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { BadgeComponent } from './badge.component'

export default {
  title: 'Widgets/BadgeComponent',
  component: BadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<BadgeComponent>

type BadgeComponentWithContent = { content: string }

const Template: Story<BadgeComponentWithContent> = (args: BadgeComponent) => ({
  component: BadgeComponent,
  props: args,
  template: '<gn-ui-badge>{{content}}</gn-ui-badge>',
})

export const Primary = Template.bind({})
Primary.args = {
  content: 'My badge!',
}
