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
import { ApiCardComponent } from './api-card.component'
import { MatTooltipModule } from '@angular/material/tooltip'
import { CopyTextButtonComponent } from '@geonetwork-ui/ui/libs/copy-text-button'

export default {
  title: 'Elements/ApiCardComponent',
  component: ApiCardComponent,
  decorators: [
    moduleMetadata({
      declarations: [CopyTextButtonComponent],
      imports: [
        UtilI18nModule,
        TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG),
        MatTooltipModule,
      ],
    }),
    applicationConfig({
      providers: [],
    }),
    componentWrapperDecorator(
      (story) => `<div style="max-width: 800px">${story}</div>`
    ),
  ],
} as Meta<ApiCardComponent>

export const Primary: StoryObj<ApiCardComponent> = {
  args: {
    link: {
      type: 'service',
      accessServiceProtocol: 'wfs',
      name: "Scot en cours d'élaboration ou de révision",
      description: 'A file that contains all roads',
      url: new URL('https://roads.com/wfs'),
    },
  },
}
