import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { RecordMetricComponent } from './record-metric.component'

export default {
  title: 'Search/RecordMetricComponent',
  component: RecordMetricComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<RecordMetricComponent>

const Template: Story<RecordMetricComponent> = (
  args: RecordMetricComponent
) => ({
  component: RecordMetricComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  count: 42,
  label: 'a metric label',
  icon: '◔',
}
