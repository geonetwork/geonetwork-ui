import {
  applicationConfig,
  componentWrapperDecorator,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { importProvidersFrom } from '@angular/core'
import { OnlineResourceCardComponent } from './online-resource-card.component'
import { aSetOfLinksFixture } from '@geonetwork-ui/common/fixtures'
import { TranslateModule } from '@ngx-translate/core'
import {
  TRANSLATE_DEFAULT_CONFIG,
  UtilI18nModule,
} from '@geonetwork-ui/util/i18n'

export default {
  title: 'Elements/OnlineResourceCardComponent',
  component: OnlineResourceCardComponent,
  decorators: [
    moduleMetadata({
      imports: [OnlineResourceCardComponent],
    }),
    applicationConfig({
      providers: [
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(UtilI18nModule),
        importProvidersFrom(TranslateModule.forRoot(TRANSLATE_DEFAULT_CONFIG)),
      ],
    }),
    componentWrapperDecorator(
      (story) =>
        `<div class="border border-gray-300 h-[200px] w-[500px] p-[10px]" style="resize: both; overflow: auto; margin: auto;">${story}</div>`
    ),
  ],
  argTypes: {
    modifyClick: { action: 'modifyClick' },
  },
} as Meta<OnlineResourceCardComponent>

export const OfTypeLink: StoryObj<OnlineResourceCardComponent> = {
  args: {
    onlineResource: aSetOfLinksFixture().readmeLink(),
  },
}
export const OfTypeServiceDistribution: StoryObj<OnlineResourceCardComponent> =
  {
    args: {
      onlineResource: aSetOfLinksFixture().geodataWms(),
    },
  }
export const OfTypeDownloadDistribution: StoryObj<OnlineResourceCardComponent> =
  {
    args: {
      onlineResource: aSetOfLinksFixture().dataCsv(),
    },
  }
export const OfTypeServiceEndpoint: StoryObj<OnlineResourceCardComponent> = {
  args: {
    onlineResource: aSetOfLinksFixture().wmsEndpoint(),
  },
}
