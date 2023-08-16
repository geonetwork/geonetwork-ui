import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { StepBarComponent } from './step-bar.component'
import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Widgets/StepBarComponent',
  component: StepBarComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
} as Meta<StepBarComponent>

export const Primary: StoryObj<StepBarComponent> = {
  args: {
    steps: 6,
    currentStep: 1,
    type: 'default',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'default'],
    },
  },
}
