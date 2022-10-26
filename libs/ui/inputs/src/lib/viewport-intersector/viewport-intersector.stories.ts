import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { ViewportIntersectorComponent } from './viewport-intersector.component'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Inputs/ViewportIntersectorComponent',
  component: ViewportIntersectorComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    componentWrapperDecorator(
      (story) => `
<div class="w-[500px] h-[300px] overflow-scroll border">
  <div class="w-[1000px] h-[1000px] pt-[50px] pl-[50px]">
    <div class='bg-blue-200 border border-blue-400 w-[200px] h-[100px]'>
      ${story}
    </div>
  </div>
</div>`
    ),
  ],
} as Meta<ViewportIntersectorComponent>

const Template: Story<ViewportIntersectorComponent> = (
  args: ViewportIntersectorComponent
) => ({
  component: ViewportIntersectorComponent,
  props: {
    ...args,
    entersViewport: action('entersViewport'),
    exitsViewport: action('exitsViewport'),
  },
})

export const Primary = Template.bind({})
Primary.args = {}
