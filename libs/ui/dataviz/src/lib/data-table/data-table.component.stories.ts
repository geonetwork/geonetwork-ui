import { provideHttpClient } from '@angular/common/http'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { DataTableComponent } from './data-table.component'
import { tableItemsFixture } from './data-table.fixtures'
import { BaseFileReader, openDataset } from '@geonetwork-ui/data-fetcher'

export default {
  title: 'Dataviz/DataTableComponent',
  component: DataTableComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[800px] p-[10px] overflow-auto resize">${story}</div>`
    ),
  ],
} as Meta<DataTableComponent>

export class MockBaseReader extends BaseFileReader {
  override async getLoadQuery() {
    await this.engine.registerData(
      'tableItemsFixture',
      new TextEncoder().encode(
        JSON.stringify({
          features: tableItemsFixture.items,
          type: 'FeatureCollection',
        })
      )
    )
    return `CREATE TABLE ${this.datasetId} AS SELECT * FROM st_read("tableItemsFixture", allowed_drivers = ['GeoJSON']);`
  }
}
const reader = new MockBaseReader('data_table_storybook')

export const Primary: StoryObj<DataTableComponent> = {
  args: {
    dataset: reader,
  },
}

export const WithCsv: StoryObj<DataTableComponent> = {
  loaders: [
    async () => ({
      dataset: await openDataset(
        'https://www.data.gouv.fr/api/1/datasets/r/b20d2793-db42-4d6d-a0b4-e94bf5ee4279',
        { typeHint: 'csv' }
      ),
    }),
  ],
  render(args, { loaded }) {
    return {
      props: loaded,
    }
  },
}

export const WithExcel: StoryObj<DataTableComponent> = {
  loaders: [
    async () => ({
      dataset: await openDataset(
        'https://www.berlin.de/sen/web/service/maerkte-feste/weihnachtsmaerkte/index.php/index/all.xls?q=',
        {
          typeHint: 'excel',
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

export const WithWfs: StoryObj<DataTableComponent> = {
  loaders: [
    async () => ({
      dataset: await openDataset(
        'https://data.grandlyon.com/geoserver/metropole-de-lyon/ows',
        {
          typeHint: 'wfs',
          wfsFeatureType:
            'metropole-de-lyon:eco_ecologie.zfevoiesexceptionnelles',
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

export const WithWfsAndFeatureCatalog: StoryObj<DataTableComponent> = {
  loaders: [
    async () => ({
      dataset: await openDataset(
        'https://data.grandlyon.com/geoserver/metropole-de-lyon/ows',
        {
          typeHint: 'wfs',
          wfsFeatureType:
            'metropole-de-lyon:eco_ecologie.zfevoiesexceptionnelles',
        }
      ),
      featureAttributes: [
        {
          value: 'date_debut',
          label: 'Date de début',
        },
        {
          value: 'date_fin',
          label: 'Date de fin',
        },
        {
          value: 'vp_horaires',
          label: 'Horaires',
        },
        {
          value: 'url_arrete',
          label: "Lien vers l'arrêté",
        },
      ],
    }),
  ],
  render(args, { loaded }) {
    return {
      props: loaded,
    }
  },
}

export const WithReallyBig190MbGeojson: StoryObj<DataTableComponent> = {
  loaders: [
    async () => ({
      dataset: await openDataset(
        'https://www.data.gouv.fr/api/1/datasets/r/d6803547-3e95-461e-bebc-b59bfd1b28e5',
        { typeHint: 'geojson' }
      ),
    }),
  ],
  render(args, { loaded }) {
    return {
      props: loaded,
    }
  },
}
