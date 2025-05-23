import { provideHttpClient } from '@angular/common/http'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { DataTableComponent } from './data-table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { tableItemsFixture } from './data-table.fixtures'
import {
  BaseFileReader,
  DataItem,
  openDataset,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'

export default {
  title: 'Dataviz/DataTableComponent',
  component: DataTableComponent,
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
        `<div class="border border-gray-300 h-[500px] w-[800px] p-[10px] overflow-auto resize">${story}</div>`
    ),
  ],
} as Meta<DataTableComponent>

export class MockBaseReader extends BaseFileReader {
  override getData(): Promise<{
    items: DataItem[]
    properties: PropertyInfo[]
  }> {
    return Promise.resolve(tableItemsFixture)
  }
}
const reader = new MockBaseReader('')

export const Primary: StoryObj<DataTableComponent> = {
  args: {
    dataset: reader,
  },
}

export const WithGeojson: StoryObj<DataTableComponent> = {
  loaders: [
    async () => ({
      dataset: await openDataset(
        'https://france-geojson.gregoiredavid.fr/repo/departements.geojson',
        'geojson'
      ),
    }),
  ],
  render(args, { loaded }) {
    return {
      props: loaded,
    }
  },
}

export const WithWfs: StoryObj<DataTableComponent> = {
  loaders: [
    async () => ({
      dataset: await openDataset(
        'https://www.geo2france.fr/geoserver/cr_hdf/ows',
        'wfs',
        {
          wfsFeatureType: 'accidento_hdf_L93',
        }
      ),
    }),
  ],
  render(args, { loaded }) {
    return {
      props: loaded,
    }
  },
}
