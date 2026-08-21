import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { TranslateModule } from '@ngx-translate/core'
import { DateRangeDropdownComponent } from './date-range-dropdown.component'

export default {
  title: 'Inputs/DateRangeDropdownComponent',
  component: DateRangeDropdownComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(TranslateModule.forRoot()),
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="w-[300px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
  argTypes: {
    startDateChange: { action: 'startDateChange' },
    endDateChange: { action: 'endDateChange' },
    dateRangeClear: { action: 'dateRangeClear' },
  },
} as Meta<DateRangeDropdownComponent>

export const NoDate: StoryObj<DateRangeDropdownComponent> = {
  args: {
    title: 'Publication date',
  },
}

export const WithRange: StoryObj<DateRangeDropdownComponent> = {
  args: {
    title: 'Publication date',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-28'),
  },
}

/** open interval: everything published after the start date */
export const WithStartDateOnly: StoryObj<DateRangeDropdownComponent> = {
  args: {
    title: 'Publication date',
    startDate: new Date('2024-01-15'),
  },
}

/** open interval: everything published before the end date */
export const WithEndDateOnly: StoryObj<DateRangeDropdownComponent> = {
  args: {
    title: 'Publication date',
    endDate: new Date('2024-03-28'),
  },
}

export const LongTitle: StoryObj<DateRangeDropdownComponent> = {
  args: {
    title: 'A very very very long title that should be truncated',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-03-28'),
  },
}
