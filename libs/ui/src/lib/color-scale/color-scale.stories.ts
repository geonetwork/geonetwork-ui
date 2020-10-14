import { withA11y } from '@storybook/addon-a11y'
import { ColorService } from '../../../../common/src/lib/color.service'
import { ColorScaleComponent } from './color-scale.component'

export default {
  title: 'UI',
  decorators: [withA11y],
}

export const ColorScaleStory = () => ({
  component: ColorScaleComponent,
})
ColorScaleStory.storyName = 'Color scale'

ColorService.applyCssVariables('#e73f51', '#c2e9dc', '#212029', '#fdfbff')
