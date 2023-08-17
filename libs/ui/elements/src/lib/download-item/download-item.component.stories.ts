import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { DownloadItemComponent } from './download-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MetadataLinkType } from '@geonetwork-ui/util/shared'
import { TranslateModule } from '@ngx-translate/core'
import { importProvidersFrom } from '@angular/core'
import { MatIcon } from '@angular/material/icon'

export default {
  title: 'Elements/DownloadsListItemComponent',
  component: DownloadItemComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatIcon],
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
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.geojson',
      type: MetadataLinkType.DOWNLOAD,
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    },
  },
  argTypes: {
    exportUrl: {
      action: 'exportUrl',
    },
  },
}
