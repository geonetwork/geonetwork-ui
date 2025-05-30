import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { MaxLinesComponent } from './max-lines.component'
import { provideI18n } from '@geonetwork-ui/util/i18n'

export default {
  title: 'Layout/MaxLinesComponent',
  component: MaxLinesComponent,
  decorators: [
    moduleMetadata({
      imports: [MaxLinesComponent],
    }),
    applicationConfig({
      providers: [provideI18n()],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 p-2" style="width: 600px; height:400px; resize: both; overflow: auto">${story}</div>`
    ),
  ],
} as Meta<MaxLinesComponent>

const largeContent = `<div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin purus elit, tincidunt et gravida sit amet, mattis eget orci. Suspendisse dignissim magna sed neque rutrum lobortis. Aenean vitae quam sapien. Phasellus eleifend tortor ac imperdiet tristique. Curabitur aliquet mauris tristique, iaculis est sit amet, pulvinar ipsum. Maecenas lacinia varius felis sit amet tempor. Curabitur pulvinar ipsum eros, quis accumsan odio hendrerit sit amet.

Vestibulum placerat posuere lectus, sed lacinia orci sagittis consectetur. Duis eget eros consectetur, pretium nulla semper, pretium justo. Nullam facilisis maximus ipsum, a tempus erat eleifend non. Nulla nec lorem sed lorem porttitor ornare. Aliquam condimentum ante at laoreet dignissim. Vestibulum vel laoreet libero. Nam finibus augue ut ligula vulputate porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nunc lorem nunc, interdum sed leo vel, vestibulum venenatis diam. Nam eget dignissim purus. Cras convallis leo sed porta tristique.</p></div>`

export const Primary: StoryObj<MaxLinesComponent> = {
  args: {
    maxLines: 6,
  },
  render: (args) => ({
    template: `<div>
    <gn-ui-max-lines [maxLines]=${args.maxLines}>${largeContent}</gn-ui-max-lines>
  </div>`,
  }),
}
