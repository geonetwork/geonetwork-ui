import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { ResultsHitsSearchKindComponent } from './results-hits-search-kind.component'
import { TranslateModule } from '@ngx-translate/core'
import { UiInputsModule } from '@geonetwork-ui/ui/inputs'
import { UiElementsModule } from '@geonetwork-ui/ui/elements'

export default {
  title: 'Search/ResultsHitsSearchKindComponent',
  component: ResultsHitsSearchKindComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        UiInputsModule,
        UiElementsModule,
      ],
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
