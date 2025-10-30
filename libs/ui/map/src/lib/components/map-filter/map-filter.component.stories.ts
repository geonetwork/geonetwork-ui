import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { MapFilterComponent } from './map-filter.component'
import { mapCtxFixture } from '@geonetwork-ui/common/fixtures'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Map/Map Filter',
  component: MapFilterComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
    componentWrapperDecorator(
      (story) => `
          <div class="border border-gray-300" style="width: 655px; height: 300px; resize: both; overflow: auto">
             ${story}
          </div>`
    ),
  ],
} as Meta<MapFilterComponent>

export const Primary: StoryObj<MapFilterComponent> = {
  args: {
    mapContext: mapCtxFixture(),
    filterLabel: 'Enable spatial filter',
    initialExtent: [-10, -10, 10, 10],
    isExtentInteractive: true,
  },
}
