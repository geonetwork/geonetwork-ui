import { Meta, StoryObj } from '@storybook/angular'
import { StarToggleComponent } from './star-toggle.component'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/StarToggle',
  component: StarToggleComponent,
} as Meta<StarToggleComponent>

export const Primary: StoryObj<StarToggleComponent> = {
  args: {
    toggled: false,
    disabled: false,
  },
  render: (args) => ({
    props: { ...args, newValue: action('newValue') },
  }),
}
