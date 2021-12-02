import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  moduleMetadata,
  Story,
  Meta,
  componentWrapperDecorator,
} from '@storybook/angular'
import { LinkCardComponent } from './link-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiElementsModule } from '../ui-elements.module'

export default {
  title: 'Elements/LinkCardComponent',
  component: LinkCardComponent,
  decorators: [
    moduleMetadata({
      imports: [
        UiElementsModule,
        BrowserAnimationsModule,
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<LinkCardComponent>

const Template: Story<LinkCardComponent> = (args: LinkCardComponent) => ({
  component: LinkCardComponent,
  props: args,
})

export const Primary = Template.bind({})
Primary.args = {
  link: {
    protocol: 'WWW:LINK',
    name: 'Consulter sur Géoclip',
    description:
      'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
    url: 'https//example.com/someurlpath',
  },
}
