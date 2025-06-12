import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { ResultsHitsSearchKindComponent } from './results-hits-search-kind.component'
import { KindBadgeComponent } from '@geonetwork-ui/ui/elements'

export default {
  title: 'Search/ResultsHitsSearchKindComponent',
  component: ResultsHitsSearchKindComponent,
  decorators: [
    moduleMetadata({
      imports: [KindBadgeComponent],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
  ],
} as Meta<ResultsHitsSearchKindComponent>

export const Primary: StoryObj<ResultsHitsSearchKindComponent> = {
  args: {
    choices: [
      { value: 'dataset', label: '' },
      { value: 'service', label: '' },
      { value: 'reuse', label: '' },
    ],
    selected: [],
  },
}
