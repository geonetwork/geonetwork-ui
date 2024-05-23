import { Meta, StoryObj } from '@storybook/angular'
import { CheckToggleComponent } from './check-toggle.component'

export default {
  title: 'Inputs/CheckToggleComponent',
  component: CheckToggleComponent,
} as Meta<CheckToggleComponent>

export const Primary: StoryObj<CheckToggleComponent> = {
  args: {
    label: 'Some label',
  },
}
