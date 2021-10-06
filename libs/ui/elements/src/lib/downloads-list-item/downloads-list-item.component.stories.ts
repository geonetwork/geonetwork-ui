import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { DownloadsListItemComponent } from './downloads-list-item.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'

export default {
  title: 'Elements/DownloadsListItemComponent',
  component: DownloadsListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [UiElementsModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<DownloadsListItemComponent>

const Template: Story<DownloadsListItemComponent> = (
  args: DownloadsListItemComponent
) => ({
  component: DownloadsListItemComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  link: {
    protocol: 'WWW:DOWNLOAD',
    name: 'allroads.geojson',
    format: 'geojson',
    description: 'A file that contains all roads',
    url: 'https//roads.com/allroads.geojson',
  },
}
Primary.argTypes = {
  exportUrl: {
    action: 'exportUrl',
  },
}
