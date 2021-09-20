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
      format: 'geojson',
      resourceName: 'allroads.geojson',
      title: 'All roads 2021',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.geojson',
    },
    {
      format: 'csv',
      resourceName: 'allroads.csv',
      title: 'All roads 2021',
      description: 'A file that contains all roads',
      url: 'https//roads.com/allroads.csv',
    },
  ],
}
