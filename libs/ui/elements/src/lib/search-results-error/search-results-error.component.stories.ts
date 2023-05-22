import {
  ErrorType,
  SearchResultsErrorComponent,
} from './search-results-error.component'
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'

export default {
  title: 'Elements/SearchResultsErrorComponent',
  component: SearchResultsErrorComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UiElementsModule,
        BrowserAnimationsModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<SearchResultsErrorComponent>

const Template: Story<SearchResultsErrorComponent> = (
  args: SearchResultsErrorComponent
) => ({
  component: SearchResultsErrorComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  type: ErrorType.RECEIVED_ERROR,
  error: 'something wrong happened',
  recordId: 'thisIsAnID',
}
Primary.argTypes = {
  type: {
    control: 'radio',
    options: [
      ErrorType.RECEIVED_ERROR,
      ErrorType.COULD_NOT_REACH_API,
      ErrorType.RECORD_NOT_FOUND,
    ],
  },
}
