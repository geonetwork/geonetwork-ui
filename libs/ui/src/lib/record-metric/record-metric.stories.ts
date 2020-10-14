import { I18nModule } from '@lib/common'
import { withA11y } from '@storybook/addon-a11y'
import { number, text, withKnobs } from '@storybook/addon-knobs'
import { Meta, moduleMetadata } from '@storybook/angular'
import { RecordMetricComponent } from './record-metric.component'

const moduleMetadatas = {
  imports: [I18nModule],
}

export default {
  title: 'UI',
  decorators: [moduleMetadata(moduleMetadatas), withKnobs, withA11y],
} as Meta

export const RecordMetricStory = () => ({
  component: RecordMetricComponent,
  props: {
    label: text('label', 'a metric label'),
    count: number('count', 42),
  },
})
RecordMetricStory.storyName = 'Record metric'
