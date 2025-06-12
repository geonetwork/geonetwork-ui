import { ErrorComponent, ErrorType } from './error.component'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Elements/ErrorComponent',
  component: ErrorComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ErrorComponent>

export const Primary: StoryObj<ErrorComponent> = {
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
        ErrorType.DATASET_HAS_NO_LINK,
        ErrorType.ORGANIZATION_HAS_NO_DATASET,
        ErrorType.ORGANIZATION_NOT_FOUND,
      ],
    },
  },
}
