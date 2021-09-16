import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { DownloadEntryComponent } from './download-entry.component'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Layout/DownloadEntryComponent',
  component: DownloadEntryComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<DownloadEntryComponent>

const Template: Story<DownloadEntryComponent> = (
  args: DownloadEntryComponent
) => ({
  component: DownloadEntryComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  format: 'geojson',
  resourceName: 'allroads.geojson',
  title: 'All roads 2021',
  description: 'A file that contains all roads',
  url: 'https//roads.com/allroads.geojson',
}
