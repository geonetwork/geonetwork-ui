import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { LoadingMaskComponent } from './loading-mask.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

export default {
  title: 'Widgets/LoadingMaskComponent',
  component: LoadingMaskComponent,
  decorators: [
    moduleMetadata({
      imports: [MatProgressSpinnerModule],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 600px; height:400px; resize: both; overflow: auto">
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
  message: 'Loading some data, please wait...',
}
