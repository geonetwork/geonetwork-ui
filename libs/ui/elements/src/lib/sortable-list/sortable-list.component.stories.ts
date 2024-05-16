import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  DatePickerComponent,
  DateRangePickerComponent,
} from '@geonetwork-ui/ui/inputs'
import { Meta, StoryObj, applicationConfig } from '@storybook/angular'
import { SortableListComponent } from './sortable-list.component'

export default {
  title: 'Elements/SortableListComponent',
  component: SortableListComponent,
  subcomponents: { DateRangePickerComponent },
  decorators: [
    applicationConfig({
      // FIXME: needed only for DateRangePickerComponent
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
} as Meta<SortableListComponent>

export const TemporalExtents: StoryObj<SortableListComponent> = {
  args: {
    addOptions: [
      { buttonLabel: 'Date déterminée', eventName: 'date' },
      { buttonLabel: 'Période de temps', eventName: 'range' },
    ],
    elements: [
      {
        component: DateRangePickerComponent,
        inputs: {
          startDate: new Date('1977-05-25'),
          endDate: new Date('1977-05-26'),
        },
      },
      {
        component: DateRangePickerComponent,
        inputs: { endDate: new Date('1978-05-25') },
      },
      {
        component: DatePickerComponent,
        inputs: { date: new Date('1979-05-25') },
      },
      {
        component: DateRangePickerComponent,
        inputs: { startDate: new Date('1977-06-25') },
      },
      { component: DateRangePickerComponent, inputs: {} },
    ],
  },
}
