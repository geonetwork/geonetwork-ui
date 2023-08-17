import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { LoadingMaskComponent } from './loading-mask.component'
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { importProvidersFrom } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

const sampleBackground =
  'url(https://geonetwork-opensource.org/_images/gn-map.png)'

export default {
  title: 'Widgets/LoadingMaskComponent',
  component: LoadingMaskComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatProgressSpinner],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 600px; height:400px; resize: both; overflow: auto; background: ${sampleBackground}">
  ${story}
</div>`
    ),
  ],
} as Meta<LoadingMaskComponent>

export const Primary: StoryObj<LoadingMaskComponent> = {
  args: {
    message: 'Loading some data, please wait...',
  },
}
