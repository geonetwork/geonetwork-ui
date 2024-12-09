import { Meta, moduleMetadata, StoryObj } from '@storybook/angular'
import { GnUiLinkifyDirective } from './linkify.directive'

export default {
  title: 'Elements/GnUiLinkifyDirective',
  decorators: [
    moduleMetadata({
      imports: [GnUiLinkifyDirective],
    }),
  ],
} as Meta<GnUiLinkifyDirective>

export const Primary: StoryObj<any> = {
  args: {
    htmlContent: `<p class='my-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin purus elit, tincidunt et gravida sit amet, mattis eget orci. Suspendisse dignissim magna sed neque rutrum lobortis. Aenean vitae quam sapien. Phasellus eleifend tortor ac imperdiet tristique. Curabitur aliquet mauris tristique, iaculis est sit amet, pulvinar ipsum. Maecenas lacinia varius felis sit amet tempor. Curabitur pulvinar ipsum eros, quis accumsan odio hendrerit sit amet.</p>
This is a link without markup: http://cnig.gouv.fr/wp-content/uploads/2019/04/190315_Standard_CNIG_SCOT.pdf<br>
Another link without markup:<br>
http://cnig.gouv.fr/IMG/pdf/210615_standard_cnig_nouveauscot.pdf<br>
<p class='my-2'>This is a link with markup: <a href="http://foo.com/(something)?after=before">This is the display text</a></p>
This is a list containing links:
<ul class='list-disc my-2 ml-3'>
  <li>http://cnig.gouv.fr/IMG/pdf/210615_standard_cnig_nouveauscot.pdf</li>
  <li><a href="http://foo.com/(something)?after=before">This is the display text</a></li>
  <li><a href="http://foo.com/(something)?after=before" style='font-weight: bolder;'>
    <span>Same link with style and <code>span</code> element inside</span>
  </a></li>
</ul>`,
  },
  argTypes: {
    htmlContent: {
      control: 'text',
    },
  },
  render: (args) => ({
    props: args,
    template: `
    <div gnUiLinkify>
      ${args.htmlContent}
    </div>`,
  }),
}
