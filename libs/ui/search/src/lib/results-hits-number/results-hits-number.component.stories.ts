import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { ResultsHitsNumberComponent } from './results-hits-number.component'

export default {
  title: 'Search/ResultsHitsNumberComponent',
  component: ResultsHitsNumberComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<ResultsHitsNumberComponent>

export const Primary: StoryObj<ResultsHitsNumberComponent> = {
  args: {
    hits: 32,
    loading: false,
  },
}
