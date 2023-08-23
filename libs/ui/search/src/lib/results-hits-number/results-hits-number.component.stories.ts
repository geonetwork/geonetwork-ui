import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { ResultsHitsNumberComponent } from './results-hits-number.component'
import { TranslateModule } from '@ngx-translate/core'

export default {
  title: 'Search/ResultsHitsNumberComponent',
  component: ResultsHitsNumberComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
  ],
} as Meta<ResultsHitsNumberComponent>

export const Primary: StoryObj<ResultsHitsNumberComponent> = {
  args: {
    hits: 32,
    loading: false,
  },
}
