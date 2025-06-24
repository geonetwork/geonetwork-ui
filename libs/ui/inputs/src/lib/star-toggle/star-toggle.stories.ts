import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { StarToggleComponent } from './star-toggle.component'
import { action } from '@storybook/addon-actions'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/StarToggle',
  component: StarToggleComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<StarToggleComponent>

export const Primary: StoryObj<StarToggleComponent> = {
  args: {
    toggled: false,
    disabled: false,
    displayLabel: false,
  },
  render: (args) => ({
    props: { ...args, newValue: action('newValue') },
  }),
}
