import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { SwitchToggleComponent } from './switch-toggle.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Inputs/SwitchToggle',
  component: SwitchToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [SwitchToggleComponent],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<SwitchToggleComponent>

export const Primary: StoryObj<SwitchToggleComponent> = {
  args: {
    options: [
      { label: 'city', checked: true },
      { label: 'municipality', checked: false },
      { label: 'state', checked: false },
    ],
    extraClasses: 'grow',
    disabled: false,
  },
  render: (args) => ({
    props: { ...args },
  }),
}
