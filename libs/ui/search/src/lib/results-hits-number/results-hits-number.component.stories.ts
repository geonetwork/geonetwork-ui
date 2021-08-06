import { Meta, moduleMetadata, Story } from '@storybook/angular'
import { ResultsHitsNumberComponent } from './results-hits-number.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '../../../../../util/i18n/src'

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

const Template: Story<ResultsHitsNumberComponent> = (
  args: ResultsHitsNumberComponent
) => ({
  component: ResultsHitsNumberComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  hits: 32,
  loading: false,
}
