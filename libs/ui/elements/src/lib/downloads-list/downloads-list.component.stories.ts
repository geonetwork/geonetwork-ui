import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { DownloadsListComponent } from './downloads-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'

export default {
  title: 'Elements/DownloadsListComponent',
  component: DownloadsListComponent,
  decorators: [
    moduleMetadata({
      imports: [UiElementsModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<DownloadsListComponent>

const Template: Story<DownloadsListComponent> = (
  args: DownloadsListComponent
) => ({
  component: DownloadsListComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  links: [
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.geojson',
      format: 'geojson',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    },
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.csv',
      format: 'csv',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.csv',
    },
  ],
}
