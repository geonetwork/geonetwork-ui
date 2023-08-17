import { Meta, StoryObj } from '@storybook/angular'
import { RecordMetricComponent } from './record-metric.component'

export default {
  title: 'Search/RecordMetricComponent',
  component: RecordMetricComponent,
  decorators: [],
} as Meta<RecordMetricComponent>

export const Primary: StoryObj<RecordMetricComponent> = {
  args: {
    count: 42,
    label: 'a metric label',
    icon: '◔',
  },
}
