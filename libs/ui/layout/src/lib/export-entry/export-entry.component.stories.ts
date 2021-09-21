import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { ExportEntryComponent } from './export-entry.component'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Layout/ExportEntryComponent',
  component: ExportEntryComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ExportEntryComponent>

const Template: Story<ExportEntryComponent> = (args: ExportEntryComponent) => ({
  component: ExportEntryComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  link: {
    protocol: 'WWW:DOWNLOAD',
    name: 'allroads.geojson',
    description: 'A file that contains all roads',
    url: 'https//roads.com/allroads.geojson',
  },
}
Primary.argTypes = {
  exportUrl: {
    action: 'exportUrl',
  },
}
