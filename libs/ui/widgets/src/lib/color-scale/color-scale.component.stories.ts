import { moduleMetadata, Story, Meta } from '@storybook/angular'
import { ColorScaleComponent } from './color-scale.component'
import { ColorService } from '@geonetwork-ui/util/shared'

export default {
  title: 'Widgets/ColorScaleComponent',
  component: ColorScaleComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<ColorScaleComponent>

const Template: Story<ColorScaleComponent> = (args: ColorScaleComponent) => {
  ColorService.applyCssVariables(
    args['Primary Color'],
    args['Secondary Color'],
    args['Main Color'],
    args['Background Color']
  )
  return {
    component: ColorScaleComponent,
    props: args,
  }
}

export const Primary = Template.bind({})
Primary.args = {
  'Primary Color': '#e73f51',
  'Secondary Color': '#c2e9dc',
  'Main Color': '#212029',
  'Background Color': '#fdfbff',
}
Primary.argTypes = {
  'Primary Color': { control: 'color' },
  'Secondary Color': { control: 'color' },
  'Main Color': { control: 'color' },
  'Background Color': { control: 'color' },
}
