import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { ExportListComponent } from './export-list.component'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Layout/ExportListComponent',
  component: ExportListComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ExportListComponent>

const Template: Story<ExportListComponent> = (args: ExportListComponent) => ({
  component: ExportListComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  links: [
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.geojson',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    },
    {
      protocol: 'WWW:DOWNLOAD',
      name: 'allroads.csv',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.csv',
    },
  ],
}
