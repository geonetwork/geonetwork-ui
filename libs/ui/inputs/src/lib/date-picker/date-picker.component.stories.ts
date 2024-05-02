import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Meta, StoryObj, applicationConfig } from '@storybook/angular'
import { DatePickerComponent } from './date-picker.component'

export default {
  title: 'Inputs/DatePickerComponent',
  component: DatePickerComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
} as Meta<DatePickerComponent>

export const NoDate: StoryObj<DatePickerComponent> = {
  args: {
    date: undefined,
  },
}

export const CurrentDate: StoryObj<DatePickerComponent> = {
  args: {
    date: new Date(),
  },
}
