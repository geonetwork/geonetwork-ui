import type { Meta, StoryObj } from '@storybook/angular'
import { componentWrapperDecorator } from '@storybook/angular'
import { subComponentListComponent } from './cards-subsections.component'

const meta: Meta<subComponentListComponent> = {
  component: subComponentListComponent,
  title: 'Layout/subComponentListComponent',
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[500px] w-[300px] overflow-auto resize">${story}</div>`
    ),
  ],
}
export default meta
type Story = StoryObj<
  subComponentListComponent & {
    subComponentCount: number
  }
>

export const Primary: Story = {
  args: {
    pageSize: 5,
    subComponentCount: 17,
  },
  render: (args) => ({
    props: {
      ...args,
      subComponentList: new Array(args.subComponentCount)
        .fill(0)
        .map((_, i) => i + 1),
    },
    template: `
    <gn-ui-cards-subsections [pageSize]='pageSize' containerClass='gap-4 p-4'>
      <div
        *ngFor='let subComponent of subComponentList'
        class='border border-black'
        #subComponent
      >
        Box {{ subComponent }}
      </div>
    </gn-ui-cards-subsections>
`,
  }),
}
