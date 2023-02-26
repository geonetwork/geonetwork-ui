import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular'
import { TableViewComponent } from './table-view.component'
import { MetadataLinkType } from '@geonetwork-ui/util/shared'
import { UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { UiWidgetsModule } from '@geonetwork-ui/ui/widgets'

export default {
  title: 'Smart/Dataviz/TableView',
  component: TableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        UiDatavizModule,
        UiWidgetsModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[800px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<TableViewComponent>

const LINKS = {
  wfs: {
    description: 'US states',
    name: 'topp:states',
    url: 'https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetCapabilities',
    type: MetadataLinkType.WFS,
  },
  csv: {
    description: 'France departments',
    url: 'https://www.data.gouv.fr/fr/datasets/r/70cef74f-70b1-495a-8500-c089229c0254',
    type: MetadataLinkType.DOWNLOAD,
  },
}

type TableViewComponentInputs = {
  link: string
}

const Template: Story<TableViewComponentInputs> = (
  args: TableViewComponentInputs
) => ({
  component: TableViewComponent,
  props: {
    link: LINKS[args.link],
  },
})
export const Primary = Template.bind({})
Primary.args = {
  link: 'wfs',
}
Primary.argTypes = {
  link: {
    control: 'radio',
    options: Object.keys(LINKS),
  },
}
