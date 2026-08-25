import { provideHttpClient } from '@angular/common/http'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { ChartViewComponent } from './chart-view.component'
import { ChartComponent } from '@geonetwork-ui/ui/dataviz'

export default {
  title: 'Smart/Dataviz/ChartView',
  component: ChartViewComponent,
  decorators: [
    moduleMetadata({
      imports: [ChartComponent],
    }),
    applicationConfig({
      providers: [provideHttpClient(), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[800px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<ChartViewComponent>

const LINKS = {
  wfs: {
    description: 'Population density in Europe',
    name: 'geonode:population_density',
    url: new URL(
      'https://maps.eurac.edu/geoserver/ows?service=WFS&version=2.0.0'
    ),
    type: 'service',
    accessServiceProtocol: 'wfs',
  },
  csv: {
    description: 'Prix des carburants en France ',
    url: new URL(
      'https://www.data.gouv.fr/api/1/datasets/r/edd67f5b-46d0-4663-9de9-e5db1c880160'
    ),
    type: 'download',
  },
}

type ChartViewComponentInputs = {
  link: string
}

export const Primary: StoryObj<ChartViewComponentInputs> = {
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
