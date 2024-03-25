import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { MaxLinesComponent } from './max-lines.component'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { importProvidersFrom } from '@angular/core'

export default {
  title: 'Elements/MaxLinesComponent',
  component: MaxLinesComponent,
  decorators: [
    moduleMetadata({
      declarations: [MaxLinesComponent],
      imports: [TranslateModule],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(UtilI18nModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
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
