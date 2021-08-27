import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ContentGhostComponent } from './content-ghost.component';

export default {
  title: 'ContentGhostComponent',
  component: ContentGhostComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ContentGhostComponent>;

const Template: Story<ContentGhostComponent> = (args: ContentGhostComponent) => ({
  component: ContentGhostComponent,
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}