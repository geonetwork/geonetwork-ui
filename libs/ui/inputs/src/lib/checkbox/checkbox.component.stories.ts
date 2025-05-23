import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { CheckboxComponent } from './checkbox.component'

export default {
  title: 'Inputs/CheckboxComponent',
  component: CheckboxComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
} as Meta<CheckboxComponent>

export const Primary: StoryObj<CheckboxComponent> = {
  args: {
    checked: false,
    indeterminate: false,
  },
  argTypes: {
    changed: {
      action: 'changed',
    },
  },
}
