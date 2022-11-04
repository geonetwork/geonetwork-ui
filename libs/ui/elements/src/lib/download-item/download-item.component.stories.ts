import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { DownloadItemComponent } from './download-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'
import { MetadataLinkType } from '@geonetwork-ui/util/shared'

export default {
  title: 'Elements/DownloadsListItemComponent',
  component: DownloadItemComponent,
  decorators: [
    moduleMetadata({
      imports: [UiElementsModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<DownloadItemComponent>

const Template: Story<DownloadItemComponent> = (
  args: DownloadItemComponent
) => ({
  component: DownloadItemComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  link: {
    protocol: 'WWW:DOWNLOAD',
    name: 'allroads.geojson',
    type: MetadataLinkType.DOWNLOAD,
    description: 'A file that contains all roads',
    url: 'https//roads.com/allroads.geojson',
  },
}
Primary.argTypes = {
  exportUrl: {
    action: 'exportUrl',
  },
}
