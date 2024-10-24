import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { DownloadItemComponent } from './download-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule } from '@ngx-translate/core'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Elements/DownloadsListItemComponent',
  component: DownloadItemComponent,
  decorators: [
    moduleMetadata({
      imports: [TranslateModule.forRoot()],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<DownloadItemComponent>

export const Primary: StoryObj<DownloadItemComponent> = {
  args: {
    link: {
      name: 'allroads.geojson',
      type: 'download',
      description: 'A file that contains all roads',
      url: new URL('https://roads.com/allroads.geojson'),
    },
  },
  argTypes: {
    exportUrl: {
      action: 'exportUrl',
    },
  },
}
