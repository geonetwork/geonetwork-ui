import type { Meta, StoryObj } from '@storybook/angular'
import { componentWrapperDecorator } from '@storybook/angular'
import { BlockListComponent } from './block-list.component'

const meta: Meta<BlockListComponent> = {
  component: BlockListComponent,
  title: 'Layout/BlockListComponent',
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[300px] overflow-auto resize">${story}</div>`
    ),
  ],
}
export default meta
type Story = StoryObj<
  BlockListComponent & {
    blockCount: number
  }
>

export const Primary: Story = {
  args: {
    pageSize: 5,
    blockCount: 17,
  },
  render: (args) => ({
    props: {
      ...args,
      blockList: new Array(args.blockCount).fill(0).map((_, i) => i + 1),
    },
    template: `
    <gn-ui-block-list [pageSize]='pageSize' containerClass='gap-4 p-4'>
      <div
        *ngFor='let block of blockList'
        class='border border-black'
        #block
      >
        Box {{ block }}
      </div>
    </gn-ui-block-list>
`,
  }),
}
