import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { FigureComponent } from './figure.component'
import { UiLayoutModule } from '../ui-layout.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

export default {
  title: 'Layout/FigureComponent',
  component: FigureComponent,
  decorators: [
    moduleMetadata({
      imports: [UiLayoutModule, BrowserAnimationsModule],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 flex items-center justify-center" style="width: 450px; height: 100px; resize: both; overflow: auto">
  ${story}
</div>`
    ),
  ],
} as Meta<FigureComponent>

const Template: Story<FigureComponent> = (args: FigureComponent) => ({
  component: FigureComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  title: 'Average population in European countries',
  icon: 'group',
  figure: '1020500',
  unit: 'hab.',
  color: 'primary',
}

Primary.argTypes = {
  color: {
    control: 'radio',
    options: ['primary', 'secondary'],
  },
}
