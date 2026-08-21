import { SpatialExtentDropdownComponent } from './spatial-extent-dropdown.component'
import { Meta, StoryObj } from '@storybook/angular'

export default {
  title: 'Inputs/SpatialExtentDropdownComponent',
  component: SpatialExtentDropdownComponent,
} as Meta<SpatialExtentDropdownComponent>

export const StartEnd: StoryObj<SpatialExtentDropdownComponent> = {
  args: {
    bbox: [1, 2, 3, 4],
  },
}
