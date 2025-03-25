import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { ProgressBarComponent } from './progress-bar.component'
import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Widgets/ProgressBarComponent',
  component: ProgressBarComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
} as Meta<ProgressBarComponent>

export const Primary: StoryObj<ProgressBarComponent> = {
  args: {
    value: 30,
    type: 'default',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'light', 'default'],
    },
  },
}
