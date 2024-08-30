import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import {
  mapCtxLayerGeojsonFixture,
  mapCtxLayerWmsFixture,
  mapCtxLayerXyzFixture,
} from '../map-context.fixtures'
import { MapContextComponent } from './map-context.component'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Map/MapContext',
  component: MapContextComponent,
  decorators: [
    moduleMetadata({
      imports: [UiMapModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(HttpClientModule),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="height: 300px; max-width: 500px" >${story}</div>`
    ),
  ],
} as Meta<MapContextComponent>

type Story = StoryObj<MapContextComponent>
export const WMS: Story = {
  args: {
    context: {
      layers: [mapCtxLayerXyzFixture(), mapCtxLayerWmsFixture()],
      view: {
        center: [7.75, 48.6],
        zoom: 4,
      },
    },
  },
}

export const GEOJSON: Story = {
  args: {
    context: {
      layers: [mapCtxLayerXyzFixture(), mapCtxLayerGeojsonFixture()],
      view: {
        center: [7.75, 48.6],
        zoom: 4,
      },
    },
  },
}
