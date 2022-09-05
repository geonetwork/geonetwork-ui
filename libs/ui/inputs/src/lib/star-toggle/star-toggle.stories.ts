import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { StarToggleComponent } from './star-toggle.component'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/StarToggle',
  component: StarToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<StarToggleComponent>

const Template: Story<StarToggleComponent> = (args: StarToggleComponent) => ({
  component: StarToggleComponent,
  props: { ...args, newValue: action('newValue') },
})

export const Primary = Template.bind({})
Primary.args = {
  toggled: false,
  disabled: false,
}
