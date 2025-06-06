import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { GeoTableViewComponent } from './geo-table-view.component'
import { pointFeatureCollectionFixture } from '@geonetwork-ui/common/fixtures'
import { provideHttpClient } from '@angular/common/http'
import { provideI18n } from '@geonetwork-ui/util/i18n'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  BaseFileReader,
  DataItem,
  PropertyInfo,
} from '@geonetwork-ui/data-fetcher'

export default {
  title: 'Map/GeoTable',
  component: GeoTableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
    applicationConfig({
      providers: [provideHttpClient(), provideI18n()],
    }),
    componentWrapperDecorator(
      (story) => `<div style="height: 400px">${story}</div>`
    ),
  ],
} as Meta<GeoTableViewComponent>

export class MockBaseReader extends BaseFileReader {
  override getData(): Promise<{
    items: DataItem[]
    properties: PropertyInfo[]
  }> {
    return Promise.resolve({
      items: pointFeatureCollectionFixture().features,
      properties: [],
    })
  }
}
const reader = new MockBaseReader('')
reader.load()

export const Primary: StoryObj<GeoTableViewComponent> = {
  args: {
    dataset: reader,
  },
}
