import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { importProvidersFrom } from '@angular/core'
import { MapContainerComponent } from './map-container.component'
import { TranslateModule } from '@ngx-translate/core'
import { mapCtxFixture } from '@geonetwork-ui/common/fixtures'

export default {
  title: 'Map/Map Container',
  component: MapContainerComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(TranslateModule.forRoot())],
    }),
    componentWrapperDecorator(
      (story) => `
          <div class="border border-gray-300" style="width: 500px; height: 300px; resize: both; overflow: auto">
             ${story}
          </div>`
    ),
  ],
  argTypes: {
    featuresClicked: {
      action: 'featuresClicked',
    },
    featuresHover: {
      action: 'featuresHover',
    },
    mapClick: {
      action: 'mapClick',
    },
  },
} as Meta<MapContainerComponent>

export const Primary: StoryObj<MapContainerComponent> = {
  args: {
    context: mapCtxFixture(),
  },
}
