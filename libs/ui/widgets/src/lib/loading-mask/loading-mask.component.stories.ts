import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { LoadingMaskComponent } from './loading-mask.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

const sampleBackground =
  'url(https://geonetwork-opensource.org/_images/gn-map.png)'

export default {
  title: 'Widgets/LoadingMaskComponent',
  component: LoadingMaskComponent,
  decorators: [
    moduleMetadata({
      imports: [MatProgressSpinnerModule],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="border border-gray-300 p-2" style="width: 600px; height:400px; resize: both; overflow: auto; background: ${sampleBackground}">
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
