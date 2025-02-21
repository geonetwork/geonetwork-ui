import { HttpClientModule } from '@angular/common/http'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TableComponent } from './table.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiDatavizModule } from '../ui-dataviz.module'
import { importProvidersFrom } from '@angular/core'
import { tableItemsFixture } from './table.fixtures'
import {
  BaseFileReader,
  DataItem,
  openDataset,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'

export default {
  title: 'Dataviz/TableComponent',
  component: TableComponent,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(UiDatavizModule),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(UtilI18nModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="height: 400px">${story}</div>`
    ),
  ],
} as Meta<TableComponent>

export class MockBaseReader extends BaseFileReader {
  override getData(): Promise<{
    items: DataItem[]
    properties: PropertyInfo[]
  }> {
    return Promise.resolve(tableItemsFixture)
  }
}
const reader = new MockBaseReader('')

export const Primary: StoryObj<TableComponent> = {
  args: {
    dataset: reader,
  },
}

export const WithGeojson: StoryObj<TableComponent> = {
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

// TODO: uncomment this once WFS support in data-fetcher is merged
// export const WithWfs: StoryObj<TableComponent> = {
//   loaders: [
//     async () => ({
//       dataset: await openDataset(
//         'https://www.geo2france.fr/geoserver/cr_hdf/ows',
//         'wfs',
//         {
//           wfsUrlEndpoint: 'https://www.geo2france.fr/geoserver/cr_hdf/ows',
//           namespace: 'accidento_hdf_L93',
//         }
//       ),
//     }),
//   ],
//   render(args, { loaded }) {
//     return {
//       props: loaded,
//     }
//   },
// }
