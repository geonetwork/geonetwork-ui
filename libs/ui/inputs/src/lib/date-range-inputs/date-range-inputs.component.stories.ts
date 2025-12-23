import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { Meta, StoryObj, applicationConfig } from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { DateRangeInputsComponent } from './date-range-inputs.component.js'
import { DatasetTemporalExtent } from '@geonetwork-ui/common/domain/model/record/metadata.model.js'

export default {
  title: 'Inputs/DateRangeInputsComponent',
  component: DateRangeInputsComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
  ],
} as Meta<DateRangeInputsComponent>

export const WithStartAndEndDates: StoryObj<DateRangeInputsComponent> = {
  args: {
    temporalExtent: {
      start: new Date('2023-01-15'),
      end: new Date('2023-12-31'),
    } as DatasetTemporalExtent,
  },
}

export const WithStartDateOnly: StoryObj<DateRangeInputsComponent> = {
  args: {
    temporalExtent: {
      start: new Date('2023-06-15'),
      end: null,
    } as DatasetTemporalExtent,
  },
}

export const WithEndDateOnly: StoryObj<DateRangeInputsComponent> = {
  args: {
    temporalExtent: {
      start: null,
      end: new Date('2023-12-31'),
    } as DatasetTemporalExtent,
  },
}

export const Empty: StoryObj<DateRangeInputsComponent> = {
  args: {
    temporalExtent: {
      start: null,
      end: null,
    } as DatasetTemporalExtent,
  },
}

export const NoTemporalExtent: StoryObj<DateRangeInputsComponent> = {
  args: {
    temporalExtent: null,
  },
}

export const WithSameDates: StoryObj<DateRangeInputsComponent> = {
  args: {
    temporalExtent: {
      start: new Date('2023-07-15'),
      end: new Date('2023-07-15'),
    } as DatasetTemporalExtent,
  },
}
