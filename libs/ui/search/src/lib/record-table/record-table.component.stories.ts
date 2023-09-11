import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { RecordTableComponent } from './record-table.component'
import { DATASET_RECORDS } from '@geonetwork-ui/common/fixtures'
import { action } from '@storybook/addon-actions'
import { MatIconModule } from '@angular/material/icon'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'

const meta: Meta<RecordTableComponent> = {
  component: RecordTableComponent,
  title: 'Search/RecordTableComponent',
  decorators: [
    moduleMetadata({
      declarations: [RecordTableComponent],
      imports: [UiInputsModule, MatIconModule],
    }),
  ],
  render: (args: RecordTableComponent) => ({
    props: {
      ...args,
      recordSelect: action('recordSelect'),
      sortByChange: action('sortByChange'),
    },
  }),
}
export default meta
type Story = StoryObj<RecordTableComponent>

export const Primary: Story = {
  args: {
    records: DATASET_RECORDS.concat(DATASET_RECORDS, DATASET_RECORDS),
    totalHits: 1234,
  },
}
