import { provideI18n } from '@geonetwork-ui/util/i18n'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  StoryObj,
} from '@storybook/angular'
import { SpatialExtentDropdownComponent } from './spatial-extent-dropdown.component'

export default {
  title: 'Inputs/SpatialExtentDropdownComponent',
  component: SpatialExtentDropdownComponent,
  decorators: [
    applicationConfig({
      providers: [provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[250px] w-[320px] p-[10px]">${story}</div>`
    ),
  ],
  argTypes: {
    bboxChange: { action: 'bboxChange' },
    errorChange: { action: 'errorChange' },
  },
} as Meta<SpatialExtentDropdownComponent>

export const Empty: StoryObj<SpatialExtentDropdownComponent> = {
  args: {
    title: 'Spatial extent',
  },
}

export const WithSelection: StoryObj<SpatialExtentDropdownComponent> = {
  args: {
    title: 'Spatial extent',
    bbox: [
      7.658986,
      47.145569,
      7.887572,
      47.259458
    ],
    fileName: 'area-of-interest.geojson',
  },
}
