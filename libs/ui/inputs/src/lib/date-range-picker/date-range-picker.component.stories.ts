import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Meta, StoryObj, applicationConfig } from '@storybook/angular'
import { DateRangePickerComponent } from './date-range-picker.component'

export default {
  title: 'Inputs/DateRangePickerComponent',
  component: DateRangePickerComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
} as Meta<DateRangePickerComponent>

export const StartEnd: StoryObj<DateRangePickerComponent> = {
  args: {
    startDate: new Date(),
    endDate: new Date(),
  },
}

export const Start: StoryObj<DateRangePickerComponent> = {
  args: {
    startDate: new Date(),
  },
}

export const End: StoryObj<DateRangePickerComponent> = {
  args: {
    endDate: new Date(),
  },
}

export const Neither: StoryObj<DateRangePickerComponent> = {
  args: {},
}
