import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TRANSLATE_DEFAULT_CONFIG } from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { TableViewComponent } from './table-view.component'
import { TableComponent, UiDatavizModule } from '@geonetwork-ui/ui/dataviz'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Smart/Dataviz/TableView',
  component: TableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [
        TableComponent,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(UiDatavizModule),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
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
    url: new URL(
      'https://ahocevar.com/geoserver/wfs?service=WFS&version=1.1.0&request=GetCapabilities'
    ),
    type: 'service',
    accessServiceProtocol: 'wfs',
  },
  csv: {
    description: 'France departments',
    url: new URL(
      'https://www.data.gouv.fr/fr/datasets/r/70cef74f-70b1-495a-8500-c089229c0254'
    ),
    type: 'download',
  },
}

type TableViewComponentInputs = {
  link: string
}

export const Primary: StoryObj<TableViewComponentInputs> = {
  args: {
    link: 'wfs',
  },
  argTypes: {
    link: {
      control: 'radio',
      options: Object.keys(LINKS),
    },
  },
  render: (args) => ({
    props: { ...args, link: LINKS[args.link] },
  }),
}
