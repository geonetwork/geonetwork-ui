import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { GeoTableViewComponent } from './geo-table-view.component'
import { provideHttpClient } from '@angular/common/http'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { BaseFileReader } from '@geonetwork-ui/data-fetcher'
import { pointFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'

export default {
  title: 'Map/GeoTable',
  component: GeoTableViewComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[900px] p-[10px] overflow-auto resize">${story}</div>`
    ),
  ],
} as Meta<GeoTableViewComponent>

export class MockBaseReader extends BaseFileReader {
  override async getLoadQuery() {
    const fixtureJson = pointFeatureCollectionFixture()
    await this.engine.registerData(
      'pointFeaturesFixture',
      new TextEncoder().encode(JSON.stringify(fixtureJson))
    )
    return `CREATE TABLE ${this.datasetId} AS SELECT * FROM st_read("pointFeaturesFixture", allowed_drivers = ['GeoJSON']);`
  }
}

export const Primary: StoryObj<GeoTableViewComponent> = {
  args: {
    dataset: new MockBaseReader('geo_table_view_storybook'),
  },
}
