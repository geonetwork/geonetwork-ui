import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { KindBadgeComponent } from './kind-badge.component'

export default {
  title: 'Elements/KindBadgeComponent',
  component: KindBadgeComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
  argTypes: {
    kind: {
      control: 'radio',
      options: ['dataset', 'service', 'reuse'],
    },
    styling: {
      control: 'radio',
      options: ['primary', 'outline', 'gray'],
    },
  },
} as Meta<KindBadgeComponent>

export const Primary: StoryObj<KindBadgeComponent> = {
  args: {
    kind: 'dataset',
    isReference: false,
    styling: 'primary',
  },
}

export const ReferenceDataset: StoryObj<KindBadgeComponent> = {
  args: {
    kind: 'dataset',
    isReference: true,
    styling: 'outline',
  },
}
