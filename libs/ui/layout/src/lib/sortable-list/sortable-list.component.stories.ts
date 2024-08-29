import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { SortableListComponent } from './sortable-list.component'
import {
  DatePickerComponent,
  DateRangePickerComponent,
} from '@geonetwork-ui/ui/inputs'

export default {
  title: 'Layout/SortableListComponent',
  component: SortableListComponent,
  decorators: [
    moduleMetadata({
      imports: [DateRangePickerComponent, DatePickerComponent],
    }),
    applicationConfig({
      // FIXME: needed only for DateRangePickerComponent
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {
    startDateChange: { action: 'startDateChange' },
    endDateChange: { action: 'endDateChange' },
    dateChange: { action: 'dateChange' },
    itemsOrderChange: { action: 'itemsOrderChange' },
  },
} as Meta<SortableListComponent>

export const TemporalExtents: StoryObj<SortableListComponent> = {
  args: {
    items: [
      {
        startDate: new Date('1977-05-25'),
        endDate: new Date('1977-05-26'),
      },
      {
        endDate: new Date('1978-05-25'),
      },
      {
        date: new Date('1979-05-25'),
      },
      {
        startDate: new Date('1977-06-25'),
      },
      {},
    ],
  },
  render: (args) => ({
    props: args,
    template: `
<gn-ui-sortable-list [items]="items" (itemsOrderChange)="itemsOrderChange($event)" [elementTemplate]='template'>
</gn-ui-sortable-list>
<ng-template #template let-item>
  <gn-ui-date-range-picker
    *ngIf="!item.date"
    [startDate]="item.startDate"
    [endDate]="item.endDate"
    (startDateChange)="startDateChange($event)"
    (endDateChange)="endDateChange($event)">
  </gn-ui-date-range-picker>
  <gn-ui-date-picker
    *ngIf="item.date"
    [date]="item.date"
    (dateChange)="dateChange($event)">
  </gn-ui-date-picker>
</ng-template>
    `,
  }),
}
