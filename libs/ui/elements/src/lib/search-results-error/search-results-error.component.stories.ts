import {
  ErrorType,
  SearchResultsErrorComponent,
} from './search-results-error.component'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { MatIcon } from '@angular/material/icon'

export default {
  title: 'Elements/SearchResultsErrorComponent',
  component: SearchResultsErrorComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatIcon],
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<SearchResultsErrorComponent>

export const Primary: StoryObj<SearchResultsErrorComponent> = {
  args: {
    type: ErrorType.RECEIVED_ERROR,
    error: 'something wrong happened',
    recordId: 'thisIsAnID',
  },
  argTypes: {
    type: {
      control: 'radio',
      options: [
        ErrorType.RECEIVED_ERROR,
        ErrorType.COULD_NOT_REACH_API,
        ErrorType.RECORD_NOT_FOUND,
      ],
    },
  },
}
