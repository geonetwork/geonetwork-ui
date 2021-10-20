import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { LoadingMaskComponent } from './loading-mask.component'

export default {
  title: 'Widgets/LoadingMaskComponent',
  component: LoadingMaskComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 300px; resize: both; overflow: auto">
  ${story}
</div>`
    ),
  ],
} as Meta<LoadingMaskComponent>

const Template: Story<LoadingMaskComponent> = (args: LoadingMaskComponent) => ({
  component: LoadingMaskComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  message: '',
}
