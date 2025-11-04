import { provideHttpClient } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { StacViewComponent } from './stac-view.component'
import { importProvidersFrom } from '@angular/core'
import { DatasetServiceDistribution } from '@geonetwork-ui/common/domain/model/record'

export default {
  title: 'Smart/Dataviz/StacView',
  component: StacViewComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        provideHttpClient(),
        provideI18n(),
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[800px] p-[10px]" style="resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<StacViewComponent>

const STAC_LINKS = {
  lidarHD: {
    name: 'Lidar HD point cloud (COPC)',
    description: 'Lidar HD classified point clouds from IGN',
    url: new URL(
      'https://stacapi-cdos.apps.okd.crocc.meso.umontpellier.fr/collections/lidarhd/items'
    ),
    type: 'service',
    accessServiceProtocol: 'stac',
  },
}

type StacViewComponentInputs = {
  link: string
}

export const Primary: StoryObj<StacViewComponentInputs> = {
  args: {
    link: 'lidarHD',
  },
  argTypes: {
    link: {
      control: 'radio',
      options: Object.keys(STAC_LINKS),
    },
  },
  render: (args) => ({
    props: {
      ...args,
      link: STAC_LINKS[args.link] as DatasetServiceDistribution,
    },
  }),
}
