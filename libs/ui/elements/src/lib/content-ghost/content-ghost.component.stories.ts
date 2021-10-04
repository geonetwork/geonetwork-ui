import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { ContentGhostComponent } from './content-ghost.component'

export default {
  title: 'Elements/ContentGhostComponent',
  component: ContentGhostComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<ContentGhostComponent>

type Args = ContentGhostComponent & { content: string }

const Template: Story<ContentGhostComponent> = (args: Args) => ({
  component: ContentGhostComponent,
  props: args,
  template: `<div class="border border-gray-500 overflow-auto p-2" style="resize: both; width: 600px; height: 250px">
    <gn-ui-content-ghost [showContent]="showContent">{{content}}</gn-ui-content-ghost>
  </div>`,
})

export const Primary = Template.bind({})
Primary.args = {
  showContent: false,
  ghostClass: 'h-full',
  content: 'My content',
}
