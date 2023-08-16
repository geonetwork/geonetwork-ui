import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { StarToggleComponent } from './star-toggle.component'
import { action } from '@storybook/addon-actions'
import { MatIcon } from '@angular/material/icon'

export default {
  title: 'Inputs/StarToggle',
  component: StarToggleComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatIcon],
      imports: [],
    }),
  ],
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
