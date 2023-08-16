import { applicationConfig, Meta, StoryObj } from '@storybook/angular'
import { SpinningLoaderComponent } from './spinning-loader.component'
import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Widgets/SpinningLoaderComponent',
  component: SpinningLoaderComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
} as Meta<SpinningLoaderComponent>

export const Primary: StoryObj<SpinningLoaderComponent> = {}
