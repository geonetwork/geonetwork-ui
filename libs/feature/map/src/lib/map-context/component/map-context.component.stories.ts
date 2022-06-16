import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiMapModule } from '@geonetwork-ui/ui/map'
import {
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  Story,
} from '@storybook/angular'
import {
  MAP_CTX_LAYER_GEOJSON_FIXTURE,
  MAP_CTX_LAYER_WMS_FIXTURE,
  MAP_CTX_LAYER_XYZ_FIXTURE,
} from '../map-context.fixtures'
import { MapContextComponent } from './map-context.component'

export default {
  title: 'Map/MapContext',
  component: MapContextComponent,
  decorators: [
    moduleMetadata({
      imports: [HttpClientModule, UiMapModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `<div style="height: 300px; max-width: 500px" >${story}</div>`
    ),
  ],
} as Meta<MapContextComponent>

const Template: Story<MapContextComponent> = (args: MapContextComponent) => ({
  component: MapContextComponent,
  props: args,
})

export const WMS = Template.bind({})
WMS.args = {
  context: {
    layers: [MAP_CTX_LAYER_XYZ_FIXTURE, MAP_CTX_LAYER_WMS_FIXTURE],
    view: {
      center: [7.75, 48.6],
      zoom: 4,
    },
  },
}

export const GEOJSON = Template.bind({})
GEOJSON.args = {
  context: {
    layers: [MAP_CTX_LAYER_XYZ_FIXTURE, MAP_CTX_LAYER_GEOJSON_FIXTURE],
    view: {
      center: [7.75, 48.6],
      zoom: 4,
    },
  },
}
