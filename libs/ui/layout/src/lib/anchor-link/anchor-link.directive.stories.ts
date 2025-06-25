import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular'
import { AnchorLinkDirective } from './anchor-link.directive'

export default {
  title: 'Layout/AnchorLinkDirective',
  decorators: [
    componentWrapperDecorator(
      (story) => `
<div class="p-3 border border-gray-200 relative overflow-y-scroll h-[400px]">
  <div class='sticky p-3 bg-gray-100 top-0'>
    ${story}
  </div>
  <h3 class='text-xl py-3 font-bold' id='header-1'>First section</h3>
  <p class='py-2'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere, elit id pharetra scelerisque, velit nulla sodales lectus, sit amet mollis felis ipsum sed justo.
    Aliquam volutpat rhoncus tincidunt. Donec pellentesque maximus rutrum. Aenean quis tincidunt massa. Fusce eget turpis lobortis dui rutrum tempor at at sem. In venenatis efficitur ultrices.
    Aenean iaculis enim ut porta vehicula. Etiam elementum posuere orci vitae rutrum. Aliquam luctus mauris sed urna fermentum sagittis. Vestibulum et elit quam. Donec lacinia eget enim non efficitur.
    Cras posuere, ante ac dignissim accumsan, eros dui semper nisl, a imperdiet turpis sem sed nulla.
  </p>
  <p class='py-2'>
    Ut nisl magna, imperdiet nec nulla eu, luctus finibus odio. Nulla facilisi. Integer ullamcorper, nunc eu feugiat sodales, dolor nulla dictum orci, et varius justo risus quis augue.
    Aenean id consequat orci. Vivamus malesuada tortor auctor risus tempor elementum. Sed ut suscipit augue. Nunc blandit tortor quis feugiat sagittis. Nulla ut lorem id ligula pretium sodales.
    Donec enim nunc, bibendum eu elit in, viverra laoreet tortor. Nam id auctor ligula, nec interdum dui. Mauris vel feugiat quam, vel sodales felis. Integer sit amet posuere mauris.
    Vivamus egestas dignissim tempus.
  </p>
  <p class='py-2'>
    <img id='my-cat' src='https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg' width='400px'>
  </p>
  <h3 class='text-xl py-3 font-bold' id='header-2'>Second section</h3>
  <p class='py-2'>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere, elit id pharetra scelerisque, velit nulla sodales lectus, sit amet mollis felis ipsum sed justo.
    Aliquam volutpat rhoncus tincidunt. Donec pellentesque maximus rutrum. Aenean quis tincidunt massa. Fusce eget turpis lobortis dui rutrum tempor at at sem. In venenatis efficitur ultrices.
    Aenean iaculis enim ut porta vehicula. Etiam elementum posuere orci vitae rutrum. Aliquam luctus mauris sed urna fermentum sagittis. Vestibulum et elit quam. Donec lacinia eget enim non efficitur.
    Cras posuere, ante ac dignissim accumsan, eros dui semper nisl, a imperdiet turpis sem sed nulla.
  </p>
  <p class='py-2'>
    Ut nisl magna, imperdiet nec nulla eu, luctus finibus odio. Nulla facilisi. Integer ullamcorper, nunc eu feugiat sodales, dolor nulla dictum orci, et varius justo risus quis augue.
    Aenean id consequat orci. Vivamus malesuada tortor auctor risus tempor elementum. Sed ut suscipit augue. Nunc blandit tortor quis feugiat sagittis. Nulla ut lorem id ligula pretium sodales.
    Donec enim nunc, bibendum eu elit in, viverra laoreet tortor. Nam id auctor ligula, nec interdum dui. Mauris vel feugiat quam, vel sodales felis. Integer sit amet posuere mauris.
    Vivamus egestas dignissim tempus.
  </p>
</div>`
    ),
  ],
} as Meta<AnchorLinkDirective>

export const Primary: StoryObj<AnchorLinkDirective> = {
  args: {
    targetId: 'header-1',
  },
  argTypes: {
    targetId: {
      control: 'select',
      options: ['header-1', 'header-2', 'my-cat', 'invalid-selector'],
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div class='cursor-pointer'
         gnUiAnchorLink="${args.targetId}"
         gnUiAnchorLinkDisabledClass="opacity-50 cursor-default"
         gnUiAnchorLinkEnabledClass="hover:underline"
         gnUiAnchorLinkInViewClass="text-blue-500"
         gnUiAnchorLinkOutOfViewClass="bg-gray-500">
      A link to ${args.targetId}
    </div>`,
  }),
}
