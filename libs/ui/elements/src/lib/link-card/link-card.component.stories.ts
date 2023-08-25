import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'
import { TranslateModule } from '@ngx-translate/core'
import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { LinkCardComponent } from './link-card.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { MatIcon } from '@angular/material/icon'

export default {
  title: 'Elements/LinkCardComponent',
  component: LinkCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [MatIcon],
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<LinkCardComponent>

export const Primary: StoryObj<LinkCardComponent> = {
  args: {
    link: {
      type: 'link',
      name: 'Consulter sur Géoclip',
      description:
        'Lorem ipsum dolor sit amet, consect etur adipiscing elit. Donec id condim entum ex. Etiam sed molestie est.',
      url: new URL('https://example.com/someurlpath'),
    },
  },
}
