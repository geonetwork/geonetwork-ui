import { Meta, StoryObj } from '@storybook/angular'

export default {
  title: 'Inputs/Links',
  decorators: [],
} as Meta

export const Primary: StoryObj = {
  render: (args) => ({
    props: args,
    template: `<div class='flex flex-col gap-5 flex-wrap'>
  <a href class='gn-ui-link'>This is a local link.</a>
  <a href class='gn-ui-link-external'>This is an external link.</a>
  <a href class='gn-ui-link-external-after'>This is an external link with the icon coming last.</a>
  <a href class='text-[24px] gn-ui-link-external'>This is a larger external link.</a>
  <a href class='text-[12px] gn-ui-link-external'>This is a smaller external link.</a>
  <a href class='gn-ui-link-external'>This is a multiline link,<br>just to make sure it still looks good.</a>
</div>`,
  }),
}
