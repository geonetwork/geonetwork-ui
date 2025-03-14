import type { Meta, StoryObj } from '@storybook/angular'
import { ResourceWrapperComponent } from './resource-wrapper.component'
import { componentWrapperDecorator } from '@storybook/angular'

const meta: Meta<ResourceWrapperComponent> = {
  component: ResourceWrapperComponent,
  title: 'Layout/ResourceWrapperComponent',
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<p>Please note that the resource-wrapper will overflow by default; to hide its items, make its container overflow-hidden!</p>
<div class="border border-gray-300 h-[150px] w-[800px] overflow-x-hidden overflow-y-auto resize">${story}</div>`
    ),
  ],
}
export default meta
type Story = StoryObj<ResourceWrapperComponent>

export const Primary: Story = {
  args: {},
  render: (args) => ({
    props: args,
    template: `
    <gn-ui-resource-wrapper containerClass='py-4 gap-4'>
      <div class='border border-black w-[160px] ml-[calc(50%-80px)]'>
        First box
      </div>
      <div class='border border-black w-[240px]'>
        Second box
      </div>
      <div class='border border-blue-700 w-[180px] h-[50px] resize overflow-auto'>
        Third box (resize me!)
      </div>
      <div class='border border-black w-[120px]'>
        Fourth box
      </div>
      <div class='border border-black w-[280px] mr-[calc(50%-140px)]'>
        Fifth box
      </div>
    </gn-ui-resource-wrapper>
`,
  }),
}
