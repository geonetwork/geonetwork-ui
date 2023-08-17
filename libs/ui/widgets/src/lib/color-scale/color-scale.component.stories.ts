import { Meta, StoryObj } from '@storybook/angular'
import { ColorScaleComponent } from './color-scale.component'
import { ThemeService } from '@geonetwork-ui/util/shared'

export default {
  title: 'Widgets/ColorScaleComponent',
  component: ColorScaleComponent,
  decorators: [],
} as Meta<ColorScaleComponent>

export const Primary: StoryObj<ColorScaleComponent> = {
  args: {
    'Primary Color': '#e73f51',
    'Secondary Color': '#c2e9dc',
    'Main Color': '#212029',
    'Background Color': '#fdfbff',
  },
  argTypes: {
    'Primary Color': { control: 'color' },
    'Secondary Color': { control: 'color' },
    'Main Color': { control: 'color' },
    'Background Color': { control: 'color' },
  },
  render: (args) => {
    ThemeService.applyCssVariables(
      args['Primary Color'],
      args['Secondary Color'],
      args['Main Color'],
      args['Background Color']
    )
    return {
      props: args,
    }
  },
}
