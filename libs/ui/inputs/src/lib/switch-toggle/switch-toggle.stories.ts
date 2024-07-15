import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { SwitchToggleComponent } from './switch-toggle.component'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { CommonModule } from '@angular/common'

export default {
  title: 'Inputs/SwitchToggle',
  component: SwitchToggleComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [SwitchToggleComponent, MatButtonToggleModule, CommonModule],
    }),
  ],
} as Meta<SwitchToggleComponent>

export const Primary: StoryObj<SwitchToggleComponent> = {
  args: {
    options: [
      { label: 'city', value: 'city', checked: true },
      { label: 'municipality', value: 'municipality', checked: false },
      { label: 'state', value: 'state', checked: false },
    ],
    extraClasses: 'grow',
  },
  render: (args) => ({
    props: { ...args },
  }),
}
