import { withA11y } from '@storybook/addon-a11y'
import { ColorService } from '../../../../common/src/lib/color.service'
import { ColorScaleComponent } from './color-scale.component'
import { color } from '@storybook/addon-knobs'

export default {
  title: 'UI',
  decorators: [withA11y],
}

const colors = {
  'Primary Color': '#e73f51',
  'Secondary Color': '#c2e9dc',
  'Main Color': '#212029',
  'Background Color': '#fdfbff',
}

function applyColors() {
  ColorService.applyCssVariables(
    colors['Primary Color'],
    colors['Secondary Color'],
    colors['Main Color'],
    colors['Background Color']
  )
}

function colorUpdate(name, defaultValue) {
  const newValue = color(name, defaultValue)
  colors[name] = newValue
  applyColors()
  return newValue
}

export const ColorScaleStory = () => ({
  component: ColorScaleComponent,
  props: {
    primaryColor: colorUpdate('Primary Color', '#e73f51'),
    secondaryColor: colorUpdate('Secondary Color', '#c2e9dc'),
    mainColor: colorUpdate('Main Color', '#212029'),
    backgroundColor: colorUpdate('Background Color', '#fdfbff'),
  },
})
ColorScaleStory.storyName = 'Color scale'
