import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { RecordMetricComponent } from './record-metric.component.js'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'

export default {
  title: 'Search/RecordMetricComponent',
  component: RecordMetricComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<RecordMetricComponent>

export const Primary: StoryObj<RecordMetricComponent> = {
  args: {
    count: 42,
    label: 'a metric label',
    icon: '◔',
  },
}
