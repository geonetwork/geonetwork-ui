import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ApplicationBannerComponent } from './application-banner.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Elements/ApplicationBannerComponent',
  component: ApplicationBannerComponent,
  decorators: [
    moduleMetadata({
      imports: [ApplicationBannerComponent],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ApplicationBannerComponent>

export const Default: StoryObj<ApplicationBannerComponent> = {
  args: {
    message: 'This is a warning message',
    closeEnabled: false,
    type: 'primary',
  },
}

export const PrimaryFull: StoryObj<ApplicationBannerComponent> = {
  args: {
    message: 'This is a warning message',
    title: 'Warning',
    closeEnabled: true,
    type: 'primary',
  },
}

export const SecondaryFull: StoryObj<ApplicationBannerComponent> = {
  args: {
    message: 'This is a warning message',
    title: 'Warning',
    closeEnabled: true,
    type: 'secondary',
  },
}

export const LightFull: StoryObj<ApplicationBannerComponent> = {
  args: {
    message: 'This is a warning message',
    title: 'Warning',
    closeEnabled: true,
    type: 'light',
  },
}
