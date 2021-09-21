import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { ExportListComponent } from './export-list.component'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ES_FIXTURE_FULL_RESPONSE } from 'libs/feature/search/src/lib/elasticsearch/fixtures/full-response.ts'

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

// //visualize more entries for testing
// let links = []
// for (const hit of ES_FIXTURE_FULL_RESPONSE.hits.hits) {
//   if (hit._source.link) {
//     links = [...links, ...hit._source.link)
//   }
// }
export const Primary = Template.bind({})
Primary.args = {
  links: ES_FIXTURE_FULL_RESPONSE.hits.hits[0]._source.link,
}
